websocket.on('upgrade', response => {})

response = http.IncomingMessage
// 握手过程中，当收到服务端回复时发出该事件，
// 你可以在response中查看cookie等header

websocket.on('open', () => {})
// 连接建立成功时发出
websocket.on('message', data => {})
// 当收到消息时发出，data 类型为 String|Buffer|ArrayBuffer|Buffer[]
websocket.on('close', (code, reason) => {})
// 当连接断开时发出
websocket.on('error', error => {})
// error 事件

// 其它属性、方法
websocket.readyState
// Constant	  Value	Description
// CONNECTING	0	    The connection is not yet open.
// OPEN	      1	    The connection is open and ready to communicate.
// CLOSING	  2	    The connection is in the process of closing.
// CLOSED	    3	    The connection is closed.

websocket.send(data[, options][, callback])
// 客户端、服务端实例都可调用
// binary {Boolean} 是否采用二进制传输，默认为false，自动检测
// mask   {Boolean} 当时客户端的实例时为true

websocket.ping([data[, mask]][, callback])
websocket.pong([data[, mask]][, callback])

websocket.close([code[, reason]])

// example for ping pong in server端
function noop() {}

function heartbeat() {
  this.isAlive = true // this是ws
}

wss.on('connection', function connection(ws) {
  ws.isAlive = true
  ws.on('pong', heartbeat)
})

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate()

    ws.isAlive = false
    ws.ping(noop)
  })
}, 30000) // 30s

// 注：Websocket客户端在收到ping事件会自动返回，不需要监听
