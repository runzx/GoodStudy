// 探索异步迭代器在 Node.js 中的使用

// 1. Node.js 中已有部分核心模块（Stream、Events）
// 2. 一些第三方 NPM 模块（mongodb）已支持 Symbol.asyncIterator 属性

// Node.js v12.16.0 中新增了 events.on(emitter, eventName) 方法，返回一个迭代 eventName 事件的异步迭代器。
const { on, EventEmitter } = require('events');

(async () => {
  const ee = new EventEmitter()
  const ite = on(ee, 'foo')

  process.nextTick(() => {
    ee.emit('foo', 'Hello')
    ee.emit('error', new Error('unknown mistake.'))
    ee.emit('foo', 'Node.js')
  })

  try {
    for await (const event of ite) {
      console.log(event) // prints ['Hello']
    }
  } catch (err) {
    console.log(err.message) // unknown mistake.
  }
})()


const fs = require('fs')
const readable = fs.createReadStream('./hello.txt', {
  encoding: 'utf-8',
  highWaterMark: 1
})

function readText(readable) {
  let data = ''
  return new Promise((resolve, reject) => {
    readable.on('data', chunk => {
      data += chunk
    })
    readable.on('end', () => {
      resolve(data)
    })
    readable.on('error', err => {
      reject(err)
    })
  })
}
// Node.js Stream 模块的可读流对象在 v10.0.0 版本试验性的支持了 [Symbol.asyncIterator] 属性
// for await...of 语句遍历可读流对象，在 v11.14.0 版本以上已 LTS 支持
// 现在通过异步迭代器能以一种更简单的方式实现，如下所示：
async function readText(readable) {
  let data = ''
  for await (const chunk of readable) {
    data += chunk
  }
  return data
}