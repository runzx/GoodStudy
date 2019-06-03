/* Service Worker 太重要了，一旦注册在用户的浏览器，全站的请求都会被 Service Worker 控制
  其实所有站点 SW 的 install 和 active 都差不多，无非是做预缓存资源列表，更新后缓存清理的工作，逻辑不太复杂，而重点在于 fetch 事件
  你需要根据不同文件的扩展名把不同的资源通过不同的策略缓存在 caches 中，各种 CSS，JS，HTML，图片，
    都需要单独搞一套缓存策略，你就知道 fetch 中需要写多少东西了吧。
可以把 Workbox 理解为 Google 官方的 PWA 框架，它解决的就是用底层 API 写 PWA 太过复杂的问题。这里说的底层 API，
  指的就是去监听 SW 的 install、active、 fetch 事件做相应逻辑处理等
 */
// 首先引入 Workbox 框架
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js'
)

// precache (预缓存) 静态文件 - 基本不会改的东西
workbox.precaching([
  // 注册成功后要立即缓存的资源列表
  // 如果你有一些静态资源是需要永远的离线缓存，除非重新上线才更新缓存的话，那 precache 预缓存应该是你所期待的，如果了解 Service Worker 的生命周期的话，
  // precache 的工作是在 Service Worker install 时候通过 Cache API 完成的
  // precaching.precacheAndRoute 接口完成 precache 操作：
  // 一种是直接写文件名的字符串（带 Hash 的），一种是如下所示带有 url 和 revesion 值的对象
])
workbox.precaching.preacheAndRoute([
  '/styles/index.0c9a31.css',
  '/scripts/main.0d5770.js',
  {
    url: '/index.html',
    revision: '383676' // 当预缓存的文件就任何变动的时候就会被更新，如果 revision 没有更新，那当你更新 Service Worker 的时候，被缓存的文件也不会被更新
  }
])

// 路由请求缓存
// html的缓存策略
workbox.routing.registerRoute(
  new RegExp('.*.html'),
  workbox.strategies.networkFirst() // 通过第二个参数的处理回调函数决定用何种策略来缓存匹配上的文件
)
/* 
路由请求缓存策略
Stale While Revalidate
  这种策略的意思是当请求的路由有对应的 Cache 缓存结果就直接返回，
    在返回 Cache 缓存结果的同时会在后台发起网络请求拿到请求结果并更新 Cache 缓存
    有一定的缺点，就是还是会有网络请求占用了用户的网络带宽
Network First
  这种策略就是当请求路由是被匹配的，就采用网络优先的策略
    如果网络请求失败，那最后被缓存的 Cache 缓存结果就会被返回到客户端
Cache First
  这个策略的意思就是当匹配到请求之后直接从 Cache 缓存中取得结果
    如果 Cache 缓存中没有结果，那就会发起网络请求
Network Only
    比较直接的策略，直接强制使用正常的网络请求
Cache Only
    这个策略也比较直接，直接使用 Cache 缓存的结果
无论使用何种策略，你都可以通过自定义一个缓存来使用或添加插件

workbox 3 原则上默认不会缓存第三方请求的返回结果
  可以允许 networkFirst 和 stalteWhileRevalidate 缓存策略生效
 */
workbox.routing.registerRoute(
  // 传入一个带有对象参数的回调函数，对象中包含匹配的 url 以及请求的 fetchEvent 参数
  ({ url, event }) => {
    return {
      name: 'workbox',
      type: 'guide'
    }
  },
  ({ url, event, params }) => {
    // 返回的结果是：A guide on workbox
    return new Response(`A ${params.type} on ${params.name}`)
  }
)

workbox.routing.registerRoute(
  new RegExp('.*.(?:js|css)'),
  workbox.strategies.cacheFirst()
)

// cdn上的静态资源是跨域的，路由匹配的时候，正则表达式必须与URL的开头匹配
// 跨域，fetch事件跨域会报错，所以缓存策略绝不能用 cachefirst 或者 cacheonly，
  // 要用staleWhileRevalidate
workbox.routing.registerRoute(
  new RegExp('https://your.cdn.com/'),
  workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
  new RegExp('https://your.img.cdn.com/'),
  workbox.strategies.cacheFirst({ cacheName: 'example:img' })
)
/* 通过 workbox.precaching 中的是 install 以后要塞进 caches 中的内容，
  workbox.routing.registerRoute 中第一个参数是一个正则，
  匹配经过 fetch 事件的所有请求，如果匹配上了，就走相应的缓存策略 
  workbox.strategies 对象为我们提供了几种最常用的策略， */

// 设置为开发模式
workbox.setConfig({ debug: true })
// 展示所有的 log
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug)

// 只展示 log, warning 和 error 类型的 log
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.log)

// 只展示 warning 和 error 类型的 log
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.warn)

// 只展示 error 类型的 log
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.error)

// 啥 log 都没有，这个适用于线上生产环境
workbox.core.setLogLevel(workbox.core.LOG_LEVELS.silent)
/* 
workbox 插件
workbox 插件通常都是在缓存策略中使用的，可以让开发者的缓存策略更加灵活，workbox 内置了一些插件：
  workbox.backgroundSync.Plugin:    如果网络请求失败，就将请求添加到 background sync 队列中，并且在下一个 sync 事件触发之前重新发起请求。
  workbox.broadcastUpdate.Plugin:   当 Cache 缓存更新的时候将会广播一个消息给所有客户端，类似于 sw-register-webpack-plugin 做的事情。
  workbox.cacheableResponse.Plugin: 让匹配的请求的符合开发者指定的条件的返回结果可以被缓存，可以通过 status, headers 参数指定一些规则条件。
  workbox.expiration.Plugin:        管理 Cache 的数量以及 Cache 的时间长短。

 */

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60, // 最大的缓存数，超过之后则走 LRU 策略清除最老最少使用缓存
        maxAgeSeconds: 30 * 24 * 60 * 60 // 这只最长缓存时间为 30 天
      })
    ]
  })
)

// 不要给 sw.js 设置不同的名字
// 不要给 sw.js 设置缓存
// 使用Service Worker缓存请求时，POST请求无法缓存