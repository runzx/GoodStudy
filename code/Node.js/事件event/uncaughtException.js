// 当未捕获的 JavaScript 异常一直冒泡回到事件循环时，会触发 'uncaughtException' 事件。
// 默认情况下，Node.js 通过将堆栈跟踪打印到 stderr 并使用退出码 1 来处理此类异常，
// 从而覆盖任何先前设置的 process.exitCode。

process.on('uncaughtException', err => {
  console.error(err)
  // proxy.end()
  process.exit()
})

process.on('uncaughtException', (err, origin) => {
  fs.writeSync(
    process.stderr.fd,
    `捕获的异常: ${err}\n` + `异常的来源: ${origin}`
  )
})
