## nodejs 的 buffer 与 js 的 ArrayBUffer

在 ES6 引入 TypedArray 之前，JavaScript 语言没有读取或操作二进制数据流的机制。Buffer 类被引入作为 Nodejs 的 API 的一部  
Buffer 类是 JavaScript 语言内置的 Uint8Array 类的子类。

```js
const buffer = new ArrayBuffer(8)
let d = new Uint8Array(buffer) // 共享内存
d = new Uint8Array(buffer, 3, 2) // 共享内存
d[1] = 97
data[1]++
const buf = Buffer.from('buffer')
const bb = new Uint8Array([1, 2, 3, 4])
const bbb = new Uint8Array(bb) // 复制新的内存,
data = new Uint8Array(buf) // 复制新的内存, off,len不起作用，整体复制
data[1]++
```

`new Uint8Array(buffer [, byteOffset [, length]]);`  
只有 buffer 为 ArrarBuffer 才有效， 共享内存  