const ws = require('ws')

// 这里不能用箭头函数 ，因为里面的this 要指向ws
const heartbeat = function(data) {
  this.isAlive = true
  mes.status('pong heartbeat ', data)
}

class Ws2tcp {
  constructor(fromPort = 5999, toHost) {
    this.toHost = toHost
    this.wss = new Ws.Server({ port: fromPort })
    // 此下面用箭头函数 ，为要connect()里this 指向 类实例
    this.wss.on('connection', (ws, req) => {
      this.connect(ws, req)
    })
    this.interval() // 心跳
  }
  connect(ws, req) {
    ws.isAlive = true
    // on 的注册方法
    // 按照监听器注册的顺序，同步地调用每个注册到名为 eventName 的事件的监听器，
    // 并传入提供的参数。
    ws.on('pong', heartbeat)
    ws.on('pong', data => {
      this.onPing(data) // 这时this才能正确
    })
  }
  onPing(data) {
    console.log(data)
  }
}

// ws.ping() 后，另一端会自动回复 pong()
