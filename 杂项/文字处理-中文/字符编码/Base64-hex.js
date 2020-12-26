// Base64与hex都是将二进制数据编码成字符串的编码方式

// 编码
let str = '哈哈'
let b = Buffer.from(str) // b中存的是哈哈的utf8编码二进制
let base64Code = b.toString('base64') // '5ZOI5ZOI'
// 解码
const code = '5ZOI5ZOI'
let buf = Buffer.from('5ZOI5ZOI', 'base64') // '哈哈' buffer
console.log('str:', str)