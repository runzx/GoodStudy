// 排序依据
// OrderBy接受一个必需的参数，它是一个描述你想要排序的行的对象，以及在什么方向。让我们来看看。
// Sort by age descending, then name ascending.
nSQL('users')
  .query('select')
  .orderBy(['age DESC', 'name ASC'])
  .exec()

// AS 语句在OrderBy之前应用，因此请确保使用列别名进行排序。
nSQL('users')
  .query('select', ['username AS name'])
  .orderBy(['name ASC'])
  .exec()

nSQL('users')
  .query('select')
  .orderBy(['UPPER(name) ASC'])
  .exec()
