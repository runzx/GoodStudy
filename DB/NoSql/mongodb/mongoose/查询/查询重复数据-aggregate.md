1. 对名称和获取名称使用聚合，计数> 1：

```js
db.collection.aggregate(
  { $group: { _id: '$name', count: { $sum: 1 } } },
  { $match: { _id: { $ne: null }, count: { $gt: 1 } } },
  { $project: { name: '$_id', _id: 0 } }
)
```

- 用 group 将作者名称分组
  - `{"group":{"_id":"$author","count":{"$sum":1}}}`
  - 这样就会将作者按照名字排序，某个作者的名字每出现一次，就会对这个作者的"count"加 1。
- 用$project 将 author 字段投射出来
  - `{"$project": {"author":1}}`
  - 这个语法与查询中的字段选择器比较像：可以通过指定
    - "fieldname" : 1 选择需要投射的字段，或者通过指定
    - "fieldname": 0 排除不需要的字段。
  - 执行完这个"$project"操作之后，结果集中的每个文档都会以
    `{"_id" : id, "author" : "authorName"}`这样的形式表示。
  - 这些结果只会在内存中存在，不会被写入磁盘。

```js
db.articles.aggregate(
  { $group: { _id: '$tid', count: { $sum: 1 } } },
  { $match: { _id: { $ne: null }, count: { $gt: 1 } } },
  { $project: { tid: '$_id', _id: 0, count: 1, title: 1 } }
)
```

2.  保存结果

- `db.collection.aggregate()`方法可以返回一个指针（cursor），
- 数据放在内存中，直接操作。
- 跟 Mongo shell 一样指针操作。

```js
var result = db.foo.aggregate(...);
db.bar.insert(result.result);

db.collection.aggregate( [
    { <operation> },
    { <operation> },
    // . . .,
    { $out :"<output-collection>" }
] )
  // 检查新的聚合运算符 $out 以获得更详细的示例。
  // 以这种方式使用 P.S ，你不限于 16Mb 个大小。

var res = db.articles.aggregate(
  {"$group" : { "_id": "$tid", "count": { "$sum": 1 } } },
  {"$match": {"_id" :{ "$ne" : null } , "count" : {"$gt": 1} } },
  {"$project": {"tid" : "$_id", "_id" : 0,"count":1,"title":1} }
)
var result = db.foo.aggregate(...);
db.test.insert(res.result); // 这样只能插入一条记录

res.forEach(function(item){
    db.test.insert(item)
})  // ok!


var code = function () {
  var num = 0;
  // Track how many bytes we've used this cursor to iterate iterated.  This function can be called
  // with some very large cursors.  SpiderMonkey appears happy to allow these objects to
  // accumulate, so regular gc() avoids an overly large memory footprint.
  //
  // TODO: migrate this function into c++
  var bytesSinceGC = 0;

  while (this.hasNext()) {
    num++;
    var nextDoc = this.next();
    bytesSinceGC += Object.bsonsize(nextDoc);

    // Garbage collect every 10 MB.
    if (bytesSinceGC > (10 * 1024 * 1024)) {
        bytesSinceGC = 0;
        gc();
    }
  }
  return num;
}
```

3. 命令集合：

- `$project` 投射操作符，用于重构每一个文档的字段，可以提取字段，重命名字段，甚至可以对原有字段进行操作后新增字段
- `$match` 匹配操作符，用于对文档集合进行筛选
- `$group` 分组操作符，用于对文档集合进行分组
- `$unwind` 拆分操作符，用于将数组中的每一个值拆分为单独的文档
- `$sort` 排序操作符，用于根据一个或多个字段对文档进行排序
- `$limit` 限制操作符，用于限制返回文档的数量
- `$skip` 跳过操作符，用于跳过指定数量的文档
- `$lookup` 连接操作符，用于连接同一个数据库中另一个集合，并获取指定的文档，类似于 populate
- `$count` 统计操作符，用于统计文档的数量
