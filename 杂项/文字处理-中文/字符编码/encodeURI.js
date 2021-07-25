
var set1 = ";,/?:@&=+$"  // 保留字符
var set2 = "-_.!~*'()"   // 不转义字符
var set3 = "#"           // 数字标志
var set4 = "ABC abc 123" // 字母数字字符和空格

console.log(encodeURI(set1)) // ;,/?:@&=+$
console.log(encodeURI(set2)) // -_.!~*'()
console.log(encodeURI(set3)) // #
console.log(encodeURI(set4)) // ABC%20abc%20123 (the space gets encoded as %20)

console.log(encodeURIComponent(set1)) // %3B%2C%2F%3F%3A%40%26%3D%2B%24
console.log(encodeURIComponent(set2)) // -_.!~*'()
console.log(encodeURIComponent(set3)) // %23
console.log(encodeURIComponent(set4)) // ABC%20abc%20123 (the space gets encoded as %20)

const querystring = require('querystring')

querystring.escape(';,/?:@&=+$# \\') // 转义
// '%3B%2C%2F%3F%3A%40%26%3D%2B%24%23%20%5C'
querystring.escape('-_.!~*\'()')  // 不转

const postData = querystring.stringify(form, null, null,
  {
    encodeURIComponent(str) {
      if()
      const cn = /^[\x00-\xff]/g

      var chinese = new RegExp(/[^\x00-\xff]/g)
      var gbkBuffer = null
      var i = 0
      var tempStr = ''
      if (chinese.test(str)) {//
        gbkBuffer = iconv.encode(str, 'gbk')
        for (i; i < gbkBuffer.length; i++) {
          tempStr += '%' + gbkBuffer[i].toString(16)
        };
        tempStr = tempStr.toUpperCase()
        return tempStr
      } else {
        return querystring.escape(str)
      }
    }
  })
