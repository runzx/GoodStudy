// 查询缓存
// 查询缓存允许您执行一次查询，然后根据需要对查询结果进行分页。这对于期望最终用户能够查看多页结果的昂贵或大型查询非常有用。

// 关于缓存的一些重要限制要记住。首先，不会使用行数据更新缓存，因此缓存表示扫描时扫描的所有行的状态。其次，缓存将保留在内存中，直到被删除。

// 要使用缓存，只需使用cache()替换exec()即可。有三种使用缓存的方法：

// 1. Return cache when query completes
nSQL('users')
  .query('select')
  .cache(
    (cacheID, count) => {
      // cacheID contains a UUID of this cache query
      // count contains the total number of records in the cache
    },
    () => {
      // query error
    }
  )

// 2. Return query pages as they are found
// this works similar to ".stream()", except as pages
// doesn't produce cache ID, doesn't require you to flush cache afterwards
nSQL('users')
  .query('select')
  .cache(
    () => {
      // query complete
    },
    () => {
      // query error
    },
    {
      pageSize: 20,
      onPage: (pageNum, rows) => {
        // pageNum is the page number starting with 0
        // rows is the query result
      },
      doNotCache: true
    }
  )

// 3. Return query pages AND cache result
nSQL('users')
  .query('select')
  .cache(
    (cacheID, count) => {
      // query complete
      // cacheID contains a UUID of this cache query
      // count contains the total number of records in the cache
    },
    () => {
      // query error
    },
    {
      pageSize: 20,
      onPage: (pageNum, rows) => {
        // pageNum is the page number starting with 0
        // rows is the query result
      }
    }
  )

const rows = nSQL().getCache(cacheID, { offset: 20, limit: 20 })
// 清除缓存也非常简单：
nSQL().clearCache(cacheID)
