1. `update()`和`findOneAndUpdate()`

- `update()`返回数据处理`条数`
- `findOneAndUpdate()`返回处理后的`数据doc`
- 简单来说，你需要获取数据就用 `findOneAndUpdate()`，
- 只需要修改数据而不关注修改后数据那就用 `update()`。
- `update()`: 用于对集合中查询条件匹配的`一个或多个`文档执行`原子更新`操作。
  - 它返回其响应中修改过的文档的`数量`。
- `findOneAndUpdate()`: 的目的是在'单个'文档上处理更新语句，以及检索该'单个'文档的内容。
  - `{new: true}`返回'修改后'的`doc`内容。
  - `{new: false}`默认选项
- 简而言之。一个是用“批量”修改而不用担心结果中的文档内容。
- 另一个是修改单个文档并返回结果中的文档内容。
- `findOneAndUpdate()`方法调用`mongodb.findAndModify()`

2. `save()`和`update()`

- `update()` 比 `find()`再`save()`效率高，因为这样不用读取整个文档。
- Mongoose 的`update`是`mongodb.update`，但是 Mongoose 的 save 可能是 MongoDB 的插入或是 update。
- `save`，mongoose 会自动 diff 新文档，只更改更新部分。这有利于`原子性`
- `update`不能触发中间件，`validation`默认不能，但是可以修改。

3. `update()`

- 更新数据以`$set`方式操作，不会覆盖其它字段内容！
- 返回结果 `{n:1,nModified:1,ok:1}`
- `{upsert: true}` 没找到会创建新文档
  - 返回结果 `{n:1,nModified:0,ok:1,"upserted": [{index:0,_id:"xxxyy..."}}`
- 内容会把查询的也更新进去
  查询 如用`_id:"5b95451acb1adb2bf0a4f9f0"` 如果值符合`ObjectId`,就会用这作新文档的`_id`
- 不符合或 path(字段)不是 schema 表中定义的`throw error`
- `updateMany()`同上

4. `insertMany()`

- 返回结果`[{doc}]`
- 参照`schema`定义会把所有`path`写入（默认或 空值）
