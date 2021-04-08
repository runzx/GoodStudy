# 返回格式

1. 多记录 数组-> 更新

```js
Model.replaceOne()
Model.update()
Model.updateMany()
Model.updateOne()
Query.prototype.replaceOne()
Query.prototype.updateMany()
Query.prototype.updateOne()

res = {
  ok: 1, // 成功
  n: 11, // Number of documents matched
  nModified: 11 // Number of documents modified
}
```

2. 删除

```js
Model.remove()

Query.prototype.deleteMany()
Query.prototype.deleteOne()
Query.prototype.remove()

res = {
  ok: 1,
  deletedCount: 2 // Number of documents removed
  n: 2  // =deletedCount
}
```

3.  批量操作

```js
Model.bulkWrite()

res = {
  modifiedCount: 1,
  deletedCount: 2 // Number of documents removed
  insertedCount: 2  // =deletedCount
}
```

4. 查询

```js
Model.findOne()
Model.findById()

res = {
  _id: ObjectId()
}
res = null // 没找到

Model.find()
res = [{ _id: ObjectId() }, {}] // Model对象
res = [] // 没找到

Model.findByIdAndUpdate()
// options.new=false 默认返回原来的文档，true返回更新后的文档
res = {} //
res = null
```
