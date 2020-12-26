// openssl genrsa -out rsa_private.key 1024
// openssl genrsa 代表生成密钥，-out 代表输出文件，
// rsa_private.key 代表文件名，1024 代表输出密钥的大小。

// 直接读取密钥文件配合加盐算法加密
const fs = require('fs')
const crytpo = require('crytpo')
const path = require('path')

let key = fs.readFileSync(path.join(__dirname, '/rsa_private.key'))
let hmac = crytpo.createHmac('sha256', key)

let result = hmac.update('hello').digest('Base64')

console.log(result) // bmi2N+6kwgwt5b+U+zSgjL/NFs+GsUnZmcieqLKBy4M=
