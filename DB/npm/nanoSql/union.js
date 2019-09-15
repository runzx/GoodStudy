// 命令允许您从一组查询的结合和汇总结果。它接受两个参数，
// 第一个是返回promise的函数数组，
// 第二个是boolean，它告诉union要删除重复的行。
// 默认情况下，删除重复行，传递true到第二个参数以包括所有行（包括重复行）。

// union命令可以结合使用.distinct()，以确保特定列在所有返回的结果中是唯一的。

// 查询修饰符像.orderBy，.where并选择参数应用到union的结果。

// union results from two json endpoints
nSQL()
  .query('select')
  .union([
    () =>
      fetch('https://jsonplaceholder.typicode.com/posts').then(d => d.json()),
    () =>
      fetch('https://jsonplaceholder.typicode.com/comments').then(d => d.json())
  ])
  .exec()
  .then()

// union results from three nanoSQL queries, distinct on id.
nSQL()
  .query('select')
  .union([
    () =>
      nSQL('users')
        .query('select')
        .exec(),
    () =>
      nSQL('posts')
        .query('select')
        .exec(),
    () =>
      nSQL('order')
        .query('select')
        .exec()
  ])
  .distinct(['id'])
  .exec()
  .then()
