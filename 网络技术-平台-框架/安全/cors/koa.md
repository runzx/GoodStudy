# koa cors

```js
import cors from "@koa/cors"

// nginx 里的 cors.conf 里已配置 跨域，不用下面再重复()
// Access-Control-Allow-Origin' '*' 只能有一条，否则错误
if (process.env.NODE_ENV === 'development') {
  app.use(cors({
    origin: '*',
    // exposeHeaders: ['content-length', 'x-header'],  // 指定浏览器可以暴露给客户端的响应消息头
    // allowHeaders: ['Content-Type', 'Authorization'], // 默认 所有；
    credentials: true, // true: 表示允许发送cookie，此时Access-Control-Allow-Origin不能设置为*，必须指定明确的，与请求网页一致的域名。
  }))
}
```