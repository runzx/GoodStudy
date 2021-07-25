/**
 * nodejs v12.7+ 支持 ESM
 * 2种方式
 */
// 1. 文件扩展名： *.mjs
// 2. package.josn:  "type":"moudle"

import { stat, exists, readFile, statSync } from 'fs'
const filePath = './test/tmp.js'
exists(filePath, exists => console.log('%s exists: %s', filePath, exists))
let res = statSync(filePath)
console.log('stat:', res)