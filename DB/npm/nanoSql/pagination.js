// 主要用于分页，这些都很容易使用。
// Get 20 records at a time, 40 records below the first one.
nSQL('users')
  .query('select')
  .limit(20)
  .offset(40)
  .exec()
