1. `Thing.find().gt('age', 21)`就等同于
   `Thing.find({age: {$gt: 21}})`

- $or 或关系
- $nor 或关系取反
- $gt 大于
- $gte 大于等于
- $lt 小于
- $lte 小于等于
- $ne 不等于
- $in 在多个值范围内
- $nin 不在多个值范围内
- $all 匹配数组中多个值
- $regex 正则，用于模糊查询
- $size 匹配数组大小
- $maxDistance 范围查询，距离（基于 LBS）
- $mod 取模运算
- $near 邻域查询，查询附近的位置（基于 LBS）
- $exists 字段是否存在
- $elemMatch 匹配内数组内的元素
- $within 范围查询（基于 LBS）
- $box 范围查询，矩形范围（基于 LBS）
- $center 范围醒询，圆形范围（基于 LBS）
- $centerSphere 范围查询，球形范围（基于 LBS）
- $slice 查询字段集合中的元素（比如从第几个之后，第 N 到第 M 个元素）

- `Model.$where`
  有时我们需要在 mongodb 中使用 javascript 表达式进行查询，这时可以用
  - `find({$where : javascript})` 方式，
  - `$where` 是一种快捷方式，并支持链式调用查询。
  - `Model.$where('this.firstname === this.lastname').exec(callback)`
- `Model.update`
  使用 update 子句更新符合指定条件的文档，更新数据在发送到数据库服务器之前会改变模型的类型。

```js
var conditions = { name: 'borne' },
  update = { $inc: { visits: 1 } },
  options = { multi: true }

Model.update(conditions, update, options, callback)
```

1. `{<field>: /pattern/<options>}`
   `db.student.find({name:{$regex:/joe/}})`
   - 在`$in`操作符中只能使用正则表达式对象，例如:
     - `{name:{$in:[/^joe/i,/^jack/}}`
   - 在使用隐式的`$and`操作符中，只能使用`$regex`，例如:
     - `{name:{$regex:/^jo/i, $nin:['john']}}`
   - 当 option 选项中包含 X 或 S 选项时，只能使用`$regex`，例如:
     - `{name:{$regex:/m.*line/,$options:"si"}}`
2. `$exists` mongodb 也同样使用

```js
// { name: { $exists: true }}
Thing.where('name').exists()
Thing.where('name').exists(true)

Thing.find().exists('name') // 最易读

// { name: { $exists: false }}
Thing.where('name').exists(false)
Thing.find().exists('name', false)
```
