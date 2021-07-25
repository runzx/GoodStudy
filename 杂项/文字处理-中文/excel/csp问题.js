import fetch from 'node-fetch'

const requestInterceptor = async (request) => {
  const url = request.url()
  const requestHeaders = request.headers()
  const acceptHeader = requestHeaders.accept || ''
  if (url.includes('some-website-with-csp.com') && (acceptHeader.includes('text/html'))) {
    const cookiesList = await page.cookies(url)
    const cookies = cookiesList.map(cookie => `${cookie.name}=${cookie.value}`).join('; ')
    delete requestHeaders['x-devtools-emulate-network-conditions-client-id']
    if (requestHeaders.Cookie) {
      requestHeaders.cookie = requestHeaders.Cookie
      delete requestHeaders.Cookie
    }
    const theseHeaders = Object.assign({ 'cookie': cookies }, requestHeaders, { 'accept-language': 'en-US,en' })

    const init = {
      body: request.postData(),
      headers: theseHeaders,
      method: request.method(),
      follow: 20,
    }
    const result = await fetch(
      url,
      init,
    )
    const resultHeaders = {}
    result.headers.forEach((value, name) => {
      if (name.toLowerCase() !== 'content-security-policy') {
        resultHeaders[name] = value
      } else {
        console.log('CSP', `omitting CSP`, { originalCSP: value })
      }
    })
    const buffer = await result.buffer()
    await request.respond({
      body: buffer,
      resultHeaders,
      status: result.status,
    })
  } else {
    request.continue()
  }
}

await page.setRequestInterception(true) // 启用请求拦截器，会激活 request.abort, request.continue 和 request.respond 方法
// 注意 启用请求拦截器会禁用页面缓存。
page.on('request', requestInterceptor)  // 当页面发送一个请求时触发。


// chrome参数跨域
await puppeteer.launch({
  args: [
    '--disable-web-security'
  ]
})
// 导航开始前应该调用完毕它, 设置绕过页面的安全政策
page.setBypassCSP(true)   // page.reload() 后？