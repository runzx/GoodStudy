## socket.remoteAddress 默认 ipv6

从某个 nodejs 版本开始，http.createServer().listen()默认是 ipv6  
`remoteAddress=::ffff:182.242.75.174`
   
server.listen(port) 改为 (port, '0.0.0.0')

如果 host 省略，如果 IPv6 可用，服务器将会接收基于未指定的 IPv6 地址 (::) 的连接，否则接收基于未指定的 IPv4 地址 (0.0.0.0) 的连接。  
在大多数的系统, 监听未指定的 IPv6 地址 (::) 可能导致 net.Server 也监听未指定的 IPv4 地址 (0.0.0.0)。   