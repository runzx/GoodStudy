/* 
绝大多数X86机器都是小端字节序

一般约定在传输时采用网络字节序（大端），统一用unicode编码。

data= 0x11223344  // 4B 16进制表示
 低地址 --> 高地址
  0   1   2   3  
+-+-+-+-+-+-+-+-+
|1 1|2 2|3 3|4 4|     // 大端 (高尾端)  BIG_ENDIAN
+-+-+-+-+-+-+-+-+

+-+-+-+-+-+-+-+-+
|4 4|3 3|2 2|1 1|     // 小端 (低尾端)  LITTLE_ENDIAN
+-+-+-+-+-+-+-+-+
 */
/* 大端字节序 */
i = (data[3] << 0) | (data[2] << 8) | (data[1] << 16) | (data[0] << 24)

/* 小端字节序 */
i = (data[0] << 0) | (data[1] << 8) | (data[2] << 16) | (data[3] << 24)

const BIG_ENDIAN = Symbol('BIG_ENDIAN')
const LITTLE_ENDIAN = Symbol('LITTLE_ENDIAN')

function getPlatformEndianness() {
  let arr32 = Uint32Array.of(0x12345678)
  let arr8 = new Uint8Array(arr32.buffer)
  switch (arr8[0] * 0x1000000 + arr8[1] * 0x10000 + arr8[2] * 0x100 + arr8[3]) {
    case 0x12345678:
      return BIG_ENDIAN
    case 0x78563412:
      return LITTLE_ENDIAN
    default:
      throw new Error('Unknown endianness')
  }
}

// 与普通数组相比，TypedArray数组的最大优点就是可以直接操作内存，
// 不需要数据类型转换，所以速度快得多

const littleEndian = (function() {
  const buffer = new ArrayBuffer(2)
  new DataView(buffer).setInt16(0, 256, true)
  return new Int16Array(buffer)[0] === 256
})()
