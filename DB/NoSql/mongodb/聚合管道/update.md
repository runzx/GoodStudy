# MongoDB 4.2 开始，您可以将 聚合管道 Aggregation Pipeline 用于更新操作

0. `https://docs.mongoing.com/mongodb-crud-operations/update-documents/updates-with-aggregation-pipeline`
1. 包括以下阶段

   1. $addFields --> $set 向文档添加新字段
   2. $project --> $unset 重新整形流中的每个文档
   3. $replaceRoot--> $replaceWith 用指定的嵌入文档替换文档

2. 表达性更强的 update 语句
   1. 根据当前字段值表示条件更新，
   2. 使用另一个字段的值更新一个字段。

```js
students.insertMany([
  { _id: 1, test1: 95, test2: 92, test3: 90, modified: new Date('01/05/2020') },
  { _id: 2, test1: 98, test2: 100, test3: 102, modified: new Date('01/05/2020') },
  { _id: 3, test1: 95, test2: 110, modified: new Date('01/04/2020') }
])

// 聚合管道使用**_id**更新文档：3
db.students.updateOne({ _id: 3 }, [{ $set: { test3: 98, modified: '$$NOW' } }])
// 管道包括$set阶段，
// 该阶段将test3字段（并将其值设置为98）添加到文档中，
// 并将修改后的字段设置为当前日期时间

db.students2.insertMany([
  { _id: 1, quiz1: 8, test2: 100, quiz2: 9, modified: new Date('01/05/2020') },
  { _id: 2, quiz2: 5, test1: 80, test2: 89, modified: new Date('01/05/2020') }
])

db.students2.updateMany({}, [
  { $replaceRoot: { newRoot: { $mergeObjects: [{ quiz1: 0, quiz2: 0, test1: 0, test2: 0 }, '$$ROOT'] } } },
  // 为 quiz1，quiz2，test1 和 test2 字段设置默认值
  // 变量 ROOT 指的是正在修改的当前文档

  { $set: { modified: '$$NOW' } }
  // $s3. et 阶段 将修改的字段更新到当前日期时间
  // 将聚合变量 NOW 用于
])

// students3
db.students3.insert([
  { _id: 1, tests: [95, 92, 90], modified: ISODate('2019-01-01T00:00:00Z') },
  { _id: 2, tests: [94, 88, 90], modified: ISODate('2019-01-01T00:00:00Z') },
  { _id: 3, tests: [70, 75, 82], modified: ISODate('2019-01-01T00:00:00Z') }
])

db.students3.updateMany({}, [
  { $set: { average: { $trunc: [{ $avg: '$tests' }, 0] }, modified: '$$NOW' } },
  // 计算 数组元素 的 截断平均值
  // 修改后的字段更新为当前日期时间

  {
    $set: {
      grade: {
        $switch: {
          branches: [
            { case: { $gte: ['$average', 90] }, then: 'A' },
            { case: { $gte: ['$average', 80] }, then: 'B' },
            { case: { $gte: ['$average', 70] }, then: 'C' },
            { case: { $gte: ['$average', 60] }, then: 'D' }
          ],
          default: 'F'
        }
      }
    }
  }
  // 用 $switch 表达式 计算平均值 添加 年级字段
])

{ "_id" : 1, "quizzes" : [ 4, 6, 7 ] }

db.students4.updateOne({ _id: 2 }, [{ $set: { quizzes: { $concatArrays: ['$quizzes', [8, 6]] } } }])

// 测验分数 添加 到具有 **_id**的文档中

// 直接 加入一个新元素，然后通过 数组 长度 修改 countView 值
WallNews.findByIdAndUpdate(res.id,
  [
    {
      $set: {
        viewer: {
          $cond: {  // 三元表达式
            if: { $in: [userInfo.uid, '$viewer'] },
            then: '$viewer',
            else: { $concatArrays: ['$viewer', [userInfo.uid]] }
          }
        }
      }
    },
    { $set: { countView: { $size: "$viewer" } }, }
  ]).then()

```

3.  findAndModify() fields Projection (v4.4) 可以接受 聚合表达式和语法
    1.  "$user.name" 字段名称或 虚线字段名称（如果该字段位于嵌入文档中）前加上美元符号$
    2.  MongoDB 4.4 开始，$投影运算符只能出现在字段路径的末尾；例如"field.$" 或"fieldA.fieldB.$"
    3.  不能同时包含$slice数组的 a 和嵌入在数组中的字段

```js
// v4.4
{ field: [ 1, 2, 3, "$someExistingField" ] }
{ field: { status: "Active", total: { $sum: "$existingArray" } } }

find( {}, { "instock": { $slice: 1 }, "instock.warehouse": 0 } )
// 以前的版本中，投影应用两个投影并返回数组
  // {$slice: 1} instock中的第一个元素
  // {instock.warehouse: 0 } 不显示此字段
// 从 MongoDB 4.4 开始，要获得相同的结果，请使用 db.collection.aggregate()具有两个单独 $project阶段的方法。

// can accept an aggregation pipeline for the update. The pipeline can consist of the following stages:

// $addFields and its alias $set
// $project and its alias $unset
// $replaceRoot and its alias $replaceWith.
db.students2.insertMany( [
   {
      "_id" : 1,
      "grades" : [
         { "grade" : 80, "mean" : 75, "std" : 6 },
         { "grade" : 85, "mean" : 90, "std" : 4 },
         { "grade" : 85, "mean" : 85, "std" : 6 }
      ]
   },
   {
      "_id" : 2,
      "grades" : [
         { "grade" : 90, "mean" : 75, "std" : 6 },
         { "grade" : 87, "mean" : 90, "std" : 3 },
         { "grade" : 85, "mean" : 85, "std" : 4 }
      ]
   }
] )

db.students2.findAndModify( {
  query: {  "_id" : 1 },
  update: [
    {
      $set: { "total" : { $sum: "$grades.grade" } }
    }
  ],  // The $set stage is an alias for ``$addFields`` stage
   new: true
} )

// Use Variables in let v5.0
db.cakeFlavors.insertMany( [
   { _id: 1, flavor: "chocolate" },
   { _id: 2, flavor: "strawberry" },
   { _id: 3, flavor: "cherry" }
] )

db.cakeFlavors.findAndModify( {
   query: {
      $expr: { $eq: [ "$flavor", "$$targetFlavor" ] }
   },
   update: { flavor: "orange" },
   let: { targetFlavor: "cherry" }
} )
```
