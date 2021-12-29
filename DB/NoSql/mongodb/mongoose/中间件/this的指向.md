1. Mongoose 有 4 种类型的中间件：文档中间件，模型中间件，聚合中间件和查询中间件。

2. 文档中间件

- 文档中间件功能中，`this` 指的是文档。
- `validate`
- `save`
- `remove`
- `init` (note: init hooks are synchronous)

3. 以下模型和查询功能支持查询中间件。

- 在查询中间件函数中，`this` 指查询。
- 查询中间件与文档中间件的区别在于微妙但重要的方式：
  - 在文档中间件中，`this` 指的是正在更新的文档。
  - 在查询中间件中，mongoose 不一定具有对正在更新的文档的引用，
    - 因此 `this` 引用 查询对象而不是正在更新的文档。

```js
count
deleteMany
deleteOne
find
findOne
findOneAndDelete
findOneAndRemove
findOneAndUpdate
remove
update
updateOne
updateMany
```

4. 聚合中间件适用于 `MyModel.aggregate()`。当您调用`exec()`聚合对象时，将执行聚合中间件。

- 在聚合中间件中，`this`指的是聚合对象。

5. 模型中间件

- `this` 指的模型对象
- `insertMany`
