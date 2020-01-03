a.pipe(b)
  .pipe(c)
  .pipe(d)
// 等同于
a.pipe(b)
b.pipe(c)
c.pipe(d)

unpipe()
// 如果没有参数，则移除所有的pipe方法目的地