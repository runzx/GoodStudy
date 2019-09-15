// 聚合函数
// 聚合函数采用行的集合，并将它们组合成一个具有结果值的行。

// 聚合函数可以与一起使用groupBy以获得多个聚合值。该groupBy参数用于确定合并哪些行一起为聚合函数。阅读groupBy docs将有助于熟悉聚合函数的工作原理groupBy。

// ＃COUNT
// Count用于获取与参数匹配的记录数。如果参数为“*”，则计算每个记录，如果提供了列值，则计算该列中具有真值的所有行。
// Get the total number of users in the database
nSQL('users')
  .query('select', ['COUNT(*)'])
  .exec()

// Get the number of users with a balance
nSQL('users')
  .query('select', ['COUNT(balance)'])
  .exec()

// Get the number of users for each account type
nSQL('users')
  .query('select', ['type', 'COUNT(*)'])
  .groupBy(['type ASC'])
  .exec()

MAX(expression)
MIN(expression)
AVG(expression) // 给定列上的所有值平均在一起。
SUM(expression)
