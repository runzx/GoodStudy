/* 
支持比较查询是
  <, =, !=, >, <=, >=
  IN, NOT IN, REGEX, LIKE, NOT LIKE
  BETWEEN, NOT BETWEEN
  INCLUDES, NOT INCLUDES 
  INTERSECT, INTERSECT ALL, NOT INTERSECT   
 */

nSQL('users')
  .query('select')
  .where(['name', 'IN', ['jeb', 'scott']])
  .exec()

// 有助于查看给定数组的任何值是否与数组列的值相交。
// get all rows where the postIDs column is an array containing 1 AND 2.
nSQL('users')
  .query('select')
  .where(['postIDs', 'INTERSECT ALL', [1, 2]])
  .exec()

// 您可以在where语句中添加任意数量的条件，用AND或分隔每个条件OR。
// Get all users who are over 20 years old and have blue as their favorite color.
nSQL('users')
  .query('select')
  .where([['age', '>', 20], 'AND', ['favoriteColor', '=', 'blue']])
  .exec()
// 如果您有两个以上的where条件，最好将它们嵌套，如下所示：
nSQL('table')
  .query('select')
  .where([
    ['postYear', '>', 1999],
    'AND',
    [(['title', 'LIKE', 'searchTerm'], 'OR', ['author', 'LIKE', 'searchTerm'])]
  ])
  .exec()
