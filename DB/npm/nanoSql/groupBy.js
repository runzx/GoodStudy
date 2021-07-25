// GroupBy用于将具有相同值的行组合成一行，几乎专门用于聚合函数。它需要完全相同的参数orderBy。

// 如果查询中未使用聚合函数，则groupBy具有相同的效果orderBy。

// Let's get the average salary of every department
nSQL('employees')
  .query('select', ['department', 'AVG(salary) AS averageSalary'])
  .groupBy(['department ASC'])
  .exec()

// Or the average transaction cost for each day
nSQL('orders')
  .query('select', ['date', 'AVG(total) AS averageTotal'])
  .groupBy(['date ASC'])
  .exec()

// Total number of transactions each day
nSQL('orders')
  .query('select', ['date', 'COUNT(*) AS numberOfTransactions'])
  .groupBy(['date ASC'])
  .exec()

// 您还可以在group By参数中使用函数：
nSQL('employees')
  .query('select', ['department', 'AVG(salary) AS averageSalary'])
  .groupBy(['TRIM(department) ASC'])
  .exec()
