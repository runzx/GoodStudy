String.fromCharCode(65) // A
String.fromCharCode(65, 66, 68) // ABD
String.fromCharCode(0x8d85, 0x8d86) // "超趆"

// 它是String上的静态方法，不可通过字符串对象直接访问。
// 所以不能多于16bit，即入参值要小于65536。如果入参需要大于65536，可以使用
String.fromCodePoint()

// charCodeAt 返回字符串指定位置的字符的UTF-16编码。该方法可以直接从字符串对象进行调用。

'AB'.charCodeAt(0) // 65
