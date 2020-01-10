// 如果在事件循环的一次轮询中，一个 Promise 被拒绝，
// 并且此 Promise 没有绑定错误处理器， 'unhandledRejection 事件会被触发。

process.on('unhandledRejection', (reason, promise) => {
  console.log('未处理的拒绝：', promise, '原因：', reason)
  // 记录日志、抛出错误、或其他逻辑。
})
