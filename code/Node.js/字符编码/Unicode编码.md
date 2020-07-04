## Unicode 编码

Unicode 码是 ASCII 码的一个超集(superset).  
它的前 128 个 code point 和 ASCII 是一致的.后面又增加了很多很多字符.  
而 UTF-32,UTF-8,UTF-16,都是 Unicode 码的编码形式:  
Unicode 码点的范围是 0-1114111 (0x10FFFF). 最前面的 128 个 Unicode 码点和 ASCII 码指向的字符完全相同  
Unicode 码点,基本多语言平面(Basic-Multilingual-Plane)只支持 0-65535 的码点,每个字符占用两个字节,对应一个码点,  
 超过这个范围的码点,需要使用四个字节,两个 code unit,  
 一个高位(U+D800 到 U+DBFF),一个低位(U+DC00 到 U+DFFF),  
 他们组成一个 surrogate pair,代表一个字符.

### UTF-8

用可变长度的字节来表示每个码点,如果只需要一个字节就能表示的,就用一个字节,一个不够,就用两个…所以,在 UTF-8 编码下,一个字符有可能由 1-4 个字节组成.

javascript 里的 charCodeAt()方法和 ES6 引进的 codePointAt()方法  
charCodeAt()方法返回一个 0-65535 的整数  
 这个数代表了指定索引位置的 UTF-16 code unit 的码点

codePointAt() 方法返回对应位置的 code unit 或 surrogate pair 的码点:  
 遇到独立能代表字符的码点,就返回它;  
 遇到 surrogate pair 里的高位 code unit,就返回整个 surrogate pair 的码点;  
 遇到 surrogate pair 里的低位 code unit,也返回这个 code unit 对应的码点(虽然它不配合任何字符).

```js
'𠮷'.length // 2  用4字节
'𠮷'.codePointAt(0) // 134071
'𠮷'.codePointAt(1) // 57271
String.fromCodePoint(134071)  // '𠮷'
String.fromCharCode(20013)    // '中'
'翟'.length // 1  用2字节
'翟'.codePointAt(0) // 32735
'翟'.codePointAt(1) // undefined
```
