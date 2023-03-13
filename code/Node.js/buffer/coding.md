## Buffer encoding

`type BufferEncoding = "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex";`

## new

```js
import { Blob, Buffer } from "node:buffer"

let b4 = new Uint8Array(3)
let buf = Buffer.from([1, 2, "255"]) // 0-255
buf = Buffer.from("abc") // [97, 98, 99]

let buf1 = Buffer.from(buf)
buf1 = Buffer.from(arrayBuffer)

const buffer = new ArrayBuffer(8)
const view = new Int32Array(buffer)

let blob = new Blob(["Hello, world!"])
```

1. Buffer 实例也是 JavaScript Uint8Array 和 TypedArray 实例。所有 TypedArray 方法在 上都可用
2. Buffer.prototype.slice() 会在现有视图上创建一个视图而不复制,
   1. TypedArray.prototype.subarray() 同一内存区
3. TypedArray.prototype.slice() 创建部分 的副本 copy
