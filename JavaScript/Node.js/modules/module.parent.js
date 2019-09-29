// module.parent
// 没有require的情况
if (!module.parent) {
  correlator.withId('Worker', startWorker)
}
// 没有父模块，直接调用当前模块，parent 属性就是 null，
// id 属性就是一个点。

// 当 Node.js 直接运行一个文件时，require.main 会被设为它的 module
if (require.main === module) {
  start().then(async res => {
    mongoose.disconnect(res => {
      console.log('mongodb close: ', res)
    })
    await cache.stop()
  })
}
// require.main.filename 来获取当前应用程序的入口点。
