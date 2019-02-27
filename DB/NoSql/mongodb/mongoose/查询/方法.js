
以上操作都会返回Query对象，该对象默认不会执行查询。可以通过以下两种方式之一执行mongoose查询：

  传入回调函数
  .exec()方法

  传入回调函数后查询会立即执行，其结果也会传入到回调函数中
  在Mongoose中，所有的回调函数的格式都是：
    callback(error, result)
      result:
        findOne()，会是一个可能为null的单文档；
        find()会是文档列表；
        count()为文档数；
        update()则为受影响的文档数等。
