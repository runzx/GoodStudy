# bulkWrite 批量操作

```js
db.collection.bulkWrite(
   [
      { insertOne : {document:{}} },
      { updateOne : {filter:{}, update:{}, upsert:false}}, //  $set 、$unset 、$rename
      { updateMany : {filter:{}, update:{}, upsert:false} },
      { replaceOne : {filter:{}, replacement:{}, upsert:false} }, // 只能替换整个文档
      { deleteOne : {filter:{}} },
      { deleteMany : {filter:{}} }
   ],
   { ordered : true }  // 默认有序操作
)

// 每组操作最多可以有1000次操作

// 排除Write Concern错误，有序操作在发生错误后停止，及无序操作继续处理队列中的剩余写入操作

// updateOne 和 updateMany 更新时增加了被修改文档的大小将会抛出 WriteError 
// replaceOne 操作替换的文档比之前的文档大会抛出 WriteError
// deleteOne 和 deleteMany 操作在固定集合上会抛出 WriteError

// bulkWrite()需要使用try..catch捕获错误

res = {
    "ok": 1, // 此次操作时候成功
    "writeErrors": [], //操作的错误异常
    "writeConcernErrors": [], // 写入关注错误
    "insertedIds": [], // 插入数据的id
    "nInserted": 0, // 直接插入操作计数
    "nUpserted": 0, // 更新插入操作计数
    "nMatched": 8, // 查询操作计数
    "nModified": 5, // 修改操作计数
    "nRemoved": 0, // 删除操作计数
    "upserted": [] // 更新插入操作的id
}


// 

Model.bulkWrite([
    { updateOne: {
      "filter": { "name": "Zander" }, // 查询条件，与 find()方法相同
      "update": { "value_index": 100 }, // 要执行的更新操作，可以是文档，也可以是聚合管道（如$set）
      "upsert": false, // 可选，Boolean类型，表示如果没有查询到该文档是否执行新增操作，默认为false
      "arrayFilters": [ { ... }, ... ], // 可选，更新文档中的嵌套数组
      "collation": { ... }, // 可选，指定更新操作的排序规则
      "hint": { ... } // 可选，指定要更新文档的索引
    } }
])

```