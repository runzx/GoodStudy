// switch case要写出很长的代码，造成不美观和难以维护

var resType
var arrKey = ['.html', '', '.js', '.css', '.gif', '.jpg', '.png', '.ico']
var arrValue = [
  'text/html',
  'text/html',
  'text/javascript',
  'text/css',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/icon'
]
arrKey.map(function(key, index) {
  if (extname == key) {
    resType = arrValue[index]
  }
})

// 或者：

var resType
var arrKey = ['.html', '', '.js', '.css', '.gif', '.jpg', '.png', '.ico']
var arrValue = [
  'text/html',
  'text/html',
  'text/javascript',
  'text/css',
  'image/gif',
  'image/jpeg',
  'image/png',
  'image/icon'
]
arrKey.forEach(function(key, index) {
  if (extname == key) {
    resType = arrValue[index]
  }
})
