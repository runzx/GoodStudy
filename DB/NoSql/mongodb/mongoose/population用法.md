## Query.populate(path, [select], [model], [match], [options])

1. path
   类型：String 或 Object。
   String 类型的时， 指定要填充的关联字段，要填充多个关联字段可以以空格分隔。
   Object 类型的时，就是把 populate 的参数封装到一个对象里。当然也可以是个数组。下面的例子中将会实现。
2. select
   类型：Object 或 String，可选，指定填充 document 中的哪些字段。
   Object 类型的时，格式如: {name: 1, \_id: 0}，为 0 表示不填充，为 1 时表示填充。
   String 类型的时，格式如: “name -\_id”，用空格分隔字段，在字段名前加上-表示不填充。详细语法介绍 query-select
   尝试中发现 select 默认会填充 \_id、 id
3. model
   类型：Model，可选，指定关联字段的 model，如果没有指定就会使用 Schema 的 ref。

4. match
   类型：Object，可选，指定附加的查询条件。
   `match: { color: 'black' }`

5. options
   类型：Object，可选，指定附加的其他查询选项，如排序以及条数限制等等。
   `options:{limit:5}`
   `options: { sort: { name: -1 }}`

6. 例：

```js
Model.populate({
  path: 'owner',
  select: 'name',
  match: { color: 'black' },
  options: { sort: { name: -1 } }
})

Model.populate('owner', 'name', null, { sort: { name: -1 } })
```
