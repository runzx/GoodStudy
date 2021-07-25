// 可用于将查询结果流式传输到另一个表中。此修饰符适用于任何查询类型，并将结果的每一行导出到提供的表中。
// 在插入之前，您可以选择传入第二个参数来改变所选行。

// copy results of upsert
nSQL('posts')
  .query('upsert', {...})
  .copyTo('postsLog')
  .exec()

// get a section of rows from one table into another
nSQL('users')
  .query('select')
  .where(['status', '=', 'banned'])
  .copyTo('bannedUsers')
  .exec()

// stream analytics
nSQL('orders')
  .query('select', ['COUNT(*) AS totalOrders', 'AVG(total) AS avgOrder'])
  .where(['orderDate', '>', Date.now() - 24 * 60 * 60 * 1000])
  .copyTo('orderStats')
  .exec()
