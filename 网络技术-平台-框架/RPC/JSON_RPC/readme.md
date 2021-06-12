# JSON_RPC

1. 基于 JSON 的跨语言远程调用协议, RPC 是一种基于 TCP 的通信协议

```js
// 请求
{
  "jsonrpc": 2.0,
  "method": "sayHello",
  "params": ["Hello JSON-RPC"], //无参数则为null
  "id": 1 // 标识符，可以为字符串，不推荐包含小数
}
// 响应
{
    "jsonrpc" : 2.0,
    "result" : "Hell JSON-RPC", // 错误时，必须为null
    "error" : null, // 错误时 错误对象
    "id" : 1  // 调用方传入的标识一致
}
// 错误对象
{
    "code" : 1,
    "message" : "Nothing found",
    "data":null
}


```
2. code 
代码 | 错误 |	含义 |
-32700	解析错误	服务器接收到无效的JSON；服务器解析JSON文本发生错误。
-32600	无效的请求	发送的JSON不是一个有效的请求。
-32601	方法未找到	方法不存在或不可见。
-36602	无效的参数	无效的方法参数。
-36603	内部错误	JSON-RPC内部错误。
-32000到-32099	服务器端错误	保留给具体实现服务器端错误。

3. RPC 的请求往往围绕一个动作
