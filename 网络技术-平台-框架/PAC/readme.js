// 它是一段 JavaScript 脚本：

function FindProxyForURL(url, host) {
  return 'DIRECT' // 所有流量都直接进入互联网，不走代理
}

// PAC 语法和函数
// url 字段就是我们在浏览器地址栏输入的待访问地址，
// host 为该地址对应的 hostname，
// return 语句有三种指令：

// 'DIRECT'  // 表示无代理直接连接
// PROXY host:port // 表示走 host:port 的 proxy 服务
// SOCKS host:port // 表示走 host:port 的 socks 服务

// 多个代理串联：
// return 'PROXY 222.20.74.89:8800; SOCKS 222.20.74.89:8899; DIRECT'

// dnsDomainIs
// 类似于 ==，但是对大小写不敏感
if (dnsDomainIs(host, 'google.com') || dnsDomainIs(host, 'www.google.com')) {
  return 'DIRECT'
}

// PAC 提供了几个内置的函数

// shExpMatch
// Shell 正则匹配，* 匹配用的比较多，可以是
// *.example.com，也是可以下面这样，
if (
  shExpMatch(host, 'vpn.domain.com') ||
  shExpMatch(url, 'http://abcdomain.com/folder/*')
) {
  return 'DIRECT'
}

// dnsResolve
// 通过 DNS 查询主机 ip，

if (
  isInNet(dnsResolve(host), '10.0.0.0', '255.0.0.0') ||
  isInNet(dnsResolve(host), '172.16.0.0', '255.240.0.0') ||
  isInNet(dnsResolve(host), '192.168.0.0', '255.255.0.0') ||
  isInNet(dnsResolve(host), '127.0.0.0', '255.255.255.0')
) {
  return 'DIRECT'
}

// PAC 文件被访问时，返回的文件类型（Content-Type）应该为：
// application/x-ns-proxy-autoconfig
// 当然，如果你不写，一般浏览器也能够自动辨别

// FindProxyByUrl(url, host) 中的
// host 在上述函数对比时无需转换成小写，对大小写不敏感
// 没必要对 dnsResolve(host) 的结果做缓存，DNS 在解析的时候会将结果缓存到系统中

// 在 Windows 系统中，通过「Internet选项 -> 连接 -> 局域网设置 -> 使用自动配置脚本」可以找到配置处，下放的地址栏填写 PAC 文件的 URI，这个 URI 可以是本地资源路径(file:///)，也可以是网络资源路径(http://)。
// Chrome 中可以在「chrome://settings/ -> 显示高级设置 -> 更改代理服务器设置」中找到 PAC 填写地址。
