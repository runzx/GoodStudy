simple-get
  最简单的方法来获取http获取请求

  这个模块是node.js上最轻的包装器http，但支持这些基本功能：
    遵循重定向
    自动处理gzip / deflate响应
    支持HTTPS
    支持指定超时
    支持便捷url键，因此url.parse在指定选项时无需在URL 上使用
    与npm包很好地结合，用于cookie，代理，表单数据和OAuth等功能
    所有这些都在<100行代码中。

  安装
  npm install simple-get

  const get = require('simple-get')

  get('http://example.com', function (err, res) {
    if (err) throw err
    console.log(res.statusCode) // 200
    res.pipe(process.stdout) // `res` is a stream
  })
  // If you just want the data, and don't want to deal with streams:
  get.concat('http://example.com', function (err, res, data) {
    if (err) throw err
    console.log(res.statusCode) // 200
    console.log(data) // Buffer('this is the server response')
  })
  // For POST, call get.post or use option { method: 'POST' }.
  const opts = {
    url: 'http://example.com',
    body: 'this is the POST body'
  }
  get.post(opts, function (err, res) {
    if (err) throw err
    res.pipe(process.stdout) // `res` is a stream
  })
  // A more complex example:
  get({
    url: 'http://example.com',
    method: 'POST',
    body: 'this is the POST body',
  
    // simple-get accepts all options that node.js `http` accepts
    // See: http://nodejs.org/api/http.html#http_http_request_options_callback
    headers: {
      'user-agent': 'my cool app'
    }
  }, function (err, res) {
    if (err) throw err
  
    // All properties/methods from http.IncomingResponse are available,
    // even if a gunzip/inflate transform stream was returned.
    // See: http://nodejs.org/api/http.html#http_http_incomingmessage
    res.setTimeout(10000)
    console.log(res.headers)
  
    res.on('data', function (chunk) {
      // `chunk` is the decoded response, after it's been gunzipped or inflated
      // (if applicable)
      console.log('got a chunk of the response: ' + chunk)
    })
  })
  // You can serialize/deserialize request and response with JSON:
  const opts = {
    method: 'POST',
    url: 'http://example.com',
    body: {
      key: 'value'
    },
    json: true
  }
  get.concat(opts, function (err, res, data) {
    if (err) throw err
    console.log(data.key) // `data` is an object
  })
  // set a timeout (in milliseconds) on the request with the timeout option
  const opts = {
    url: 'http://example.com',
    timeout: 2000 // 2 second timeout
  }
  
  get(opts, function (err, res) {})
 