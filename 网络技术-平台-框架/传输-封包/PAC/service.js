net
  .createServer(function(clientSocket) {
    clientSocket.once('data', function(firstChunk) {
      // 解析http协议头, 分析出请求的url
      var url = /[A-Z]+\s+([^\s]+)\s+HTTP/.exec(firstChunk)[1]
      if (url.indexOf('//') === -1) {
        // https协议交给pac脚本会得到错误的端口.
        url = 'http://' + url
      }
      // 这个异步调用是在使用pac脚本计算应该使用哪个代理.
      getProxyHostAndPort(url, function(hostAndPort) {
        var serverSocket = net.connect(
          hostAndPort.port,
          hostAndPort.host,
          function() {
            clientSocket.pipe(serverSocket)
            serverSocket.write(firstChunk)
            serverSocket.pipe(clientSocket)
            serverSocket.on('end', function() {
              clientSocket.end()
            })
          }
        )
      })
    })
  })
  .listen(8088)

var shExpMatch = (function() {
  var _map = { '.': '\\.', '*': '.*?', '?': '.' }
  var _rep = function(m) {
    return _map[m]
  }
  return function(text, exp) {
    return new RegExp(exp.replace(/\.|\*|\?/g, _rep)).test(text)
  }
})()

var isInNet = (function() {
  function convert_addr(ipchars) {
    var bytes = ipchars.split('.')
    return (
      ((bytes[0] & 0xff) << 24) |
      ((bytes[1] & 0xff) << 16) |
      ((bytes[2] & 0xff) << 8) |
      (bytes[3] & 0xff)
    )
  }
  return function(ipaddr, pattern, maskstr) {
    var match = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(ipaddr)
    if (match[1] > 255 || match[2] > 255 || match[3] > 255 || match[4] > 255) {
      return false // not an IP address
    }
    var host = convert_addr(ipaddr)
    var pat = convert_addr(pattern)
    var mask = convert_addr(maskstr)
    return (host & mask) == (pat & mask)
  }
})()

// 我们采用new Function的方式避免使用eval，使用eval对js压缩工具不友好
var fnPac = new Function(
  'shExpMatch',
  'isInNet',
  pacCode + ';return FindProxyForURL;'
)(shExpMatch, isInNet)
function getProxyHostAndPort(url, callback) {
  var hostAndPort = parseHostAndPort(url)
  var str = fnPac(url, hostAndPort.host)
  var p = str.split(/\s*;\s*/g)[0]
  if (p.indexOf('PROXY') !== -1) {
    var m = /PROXY\s*([^:]+)(?::(\d+))?/.exec(p)
    callback({
      host: m[1],
      port: Number(m[2]) || 8080
    })
  } else {
    callback(hostAndPort)
  }
}

// dnsResolve() 这个函数是个同步的，但是nodejs里提供的dns.resolve接口是异步的，

//  https://github.com/hackwaly/http-proxy-pac/blob/master/proxy.js

const _url = require('url')

function parseHostAndPort(url) {
  var urlInfo = _url.parse(url)
  return {
    host: urlInfo.hostname,
    port: urlInfo.port
  }
}
