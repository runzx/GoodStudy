# explaind
1. 只要对游标调用该方法，就可以得到查询细节\
2. `db.tablename.find().explain( "executionStats" )`
3. queryPlanner
   1. stage: IXSCAN，表示进行的是 index scanning
      1. COLLSCAN 全表扫描
      2. FETCH 根据索引去检索指定 doc
      3. SORT
      4. LIMIT
      5. SKIP
      6. COUNT
      7. COUNT_SCAN: count 使用了 Index 
      8. COUNTSCAN: count 不使用 Index
      9. TEXT 全文索引 
      10. PROJECTION
      11. IDHACK 针对 _id查询
      12. SUBPLA：未使用到索引的$or查询的stage返回

```
nReturned：执行返回的文档数
executionTimeMillis： 执行时间（ms）
totalKeysExamined：索引扫描条数
totalDocsExamined：文档扫描条数
executionStages：执行步骤

```