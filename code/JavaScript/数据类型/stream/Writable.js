/* 
客户端的http requests
服务器的http responses
fs write streams
zlib streams
crypto streams
tcp sockets
child process stdin
process.stdout, process.stderr
*/

readableStream.setEncoding('utf8')

readableStream.on('data', function(chunk) {
  writableStream.write(chunk)
})

// writable属性返回一个布尔值。如果数据流仍然打开，并且可写，就返回true，否则返回false。
s.writeable
// write方法返回一个布尔值，表示本次数据是否处理完成。
// 如果返回true，就表示可以写入新的数据了。
// 如果等待写入的数据被缓存了，就返回false，
s.write(buffer) // 写入二进制数据
s.write(string, encoding) // 写入字符串，编码默认为utf-8
