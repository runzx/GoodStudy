// Select只有一个参数，它是一个可选的列和/或函数数组，可应用于查询
nSQL('users')
  .query('select', ['username AS name', 'age'])
  .exec()

// 查询可用于获取表中的缓存行数
nSQL('myTable')
  .query('total')
  .exec()

// 这些缓存更新的异步性质意味着使用不带{rebuild: true}参数的此查询可能会给出不是100％准确的结果
// .query("select", ["COUNT(*)"])即使使用，此查询也要快几个数量级{rebuild: true}。
