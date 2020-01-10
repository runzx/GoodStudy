// 每当 input 流接收到 <ctrl>-C 输入（通常称为 SIGINT）时，就会触发 'SIGINT' 事件。 如果当 input 流接收到 SIGINT 时没有注册 'SIGINT' 事件监听器，则会触发 'pause' 事件。

// 要注意的是SIGINT信号事件被注册后，在终端按下 Ctrl+C就没法终止程序了，所以在事件回调函数内必须调用process.exit()函数终止程序。
process.on('SIGINT', () => {
  console.log('Exit now!')
  process.exit()
})
