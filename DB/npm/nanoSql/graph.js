// 图表命令接受对象中的对象或数组，因为它的说法，由所描述的InanoSQLGraphArgs接口。

nSQL('users')
  .query('select')
  .graph({
    key: 'userOrders',
    with: { table: 'orders' },
    on: ['users.id', '=', 'orders.userID']
  })
  .exec()

// 可以使用查询修饰符来调整图形结果集，就像调整任何其他nanoSQL查询一样。
nSQL('users')
  .query('select')
  .graph({
    key: 'userOrders',
    with: { table: 'orders' },
    on: ['users.id', '=', 'orders.userID'],
    limit: 20,
    orderBy: ['total ASC'],
    groupBy: ['date ASC'],
    select: ['id', 'AVG(total) AS averageTotal', 'date'],
    graph: {
      // nested graph query
      key: 'items',
      with: { table: 'products' },
      on: ['products.id', 'IN', 'orders.productList']
    }
  })
  .exec()

// 只需将图形对象数组传递给.graph()方法而不只是一个对象，也可以进行多个图形查询。

// 请记住，图形查询将尽可能使用索引，因此，如果您可以合理地使用on检查主键或辅助索引值的条件，您将看到改进的性能。
