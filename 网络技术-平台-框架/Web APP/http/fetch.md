## Fetch API 提供了一个获取资源的接口（包括跨域请求）

对 Request 和 Response （以及其他与网络请求有关的）对象的通用定义  
全局 fetch() 方法  
`Promise<Response> fetch(input[, init]);`

- 当接收到一个代表错误的 HTTP 状态码时，从 fetch() 返回的 Promise 不会被标记为 reject， 即使响应的 HTTP 状态码是 404 或 500。相反，它会将 Promise 状态标记为 resolve （但是会将 resolve 的返回值的 ok 属性设置为 false ），仅当网络故障时或请求被阻止时，才会标记为 reject。
- fetch() 不会接受跨域 cookies；你也不能使用 fetch() 建立起跨域会话。其他网站的 Set-Cookie 头部字段将会被无视。
- fetch 不会发送 cookies。除非你使用了 credentials 的初始化选项。（自 2017 年 8 月 25 日以后，默认的 credentials 政策变更为 same-origin。Firefox 也在 61.0b13 版本中进行了修改）

### input

定义要获取的资源。这可能是：

- 一个 USVString 字符串，包含要获取资源的 URL。一些浏览器会接受 blob: 和 data: 作为 schemes.
- 一个 Request 对象。

### init

- method: 请求使用的方法，如 GET、POST。

- headers: 请求的头信息，形式为 Headers 的对象或包含 ByteString 值的对象字面量。

- body: 请求的 body 信息：可能是一个 Blob、BufferSource、FormData、URLSearchParams 或者 USVString 对象。注意 GET 或 HEAD 方法的请求不能包含 body 信息。

- mode: 请求的模式，如 cors、 no-cors 或者 same-origin。

- cache: 请求的 cache 模式: default 、 no-store 、 reload 、 no-cache 、 force-cache 或者 only-if-cached 。
- redirect: 可用的 redirect 模式: follow (自动重定向), error (如果产生重定向将自动终止并且抛出一个错误), 或者 manual (手动处理重定向). 在 Chrome 中，Chrome 47 之前的默认值是 follow，从 Chrome 47 开始是 manual。

- referrer: 一个 USVString 可以是 no-referrer、client 或一个 URL。默认是 client。

- referrerPolicy: 指定了 HTTP 头部 referer 字段的值。可能为以下值之一： no-referrer、 no-referrer-when-downgrade、 origin、 origin-when-cross-origin、 unsafe-url 。

- integrity: 包括请求的 subresource integrity 值 （ 例如： sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=）。

- credentials 是 Request 接口的只读属性，用于表示用户代理是否应该在跨域请求的情况下从其他域发送 cookies。  
  这与 XHR 的 withCredentials 标志相似，不同的是有三个可选值（后者是两个）：  
  从 Chrome 50 开始， 这个属性也可以接受 FederatedCredential 实例或是一个 PasswordCredential 实例

  - omit: 从不发送 cookies.
  - same-origin: 只有当 URL 与响应脚本同源才发送 cookies、 HTTP Basic authentication 等验证信息.(浏览器默认值,在旧版本浏览器，例如 safari 11 依旧是 omit，safari 12 已更改)
  - include: 不论是不是跨域的请求,总是发送请求资源域在本地的 cookies、 HTTP Basic authentication 等验证信息.
