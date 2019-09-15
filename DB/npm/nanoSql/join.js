// join命令将对象或对象数组作为其参数，由InanoSQLJoinArgs接口描述

nSQL('users')
  .query('select')
  .join({
    type: 'left',
    with: { table: 'orders' },
    on: ['users.id', '=', 'orders.userID']
  })
  .exec()

// 使用时join，必须在查询的其余部分使用table.column语法，如下所示：
nSQL('users')
  .query('select', ['users.id', 'users.name', 'orders.date', 'orders.total'])
  .join({
    type: 'left',
    with: { table: 'orders' },
    on: ['users.id', '=', 'orders.userID']
  })
  .where(['orders.total', '>', 200])
  .orderBy(['orders.date ASC'])
  .exec()
  .then()
