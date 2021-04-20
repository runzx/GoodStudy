## UTF 的字节序和 BOM

1. 内码
   | 编码 | 表示（16 进制） | 表示（10 进制） |
   | ---------------- | --------------- | --------------- |
   | UTF-8 | EF BB BF | 239 187 191 |
   | UTF-16（大端序） | FE FF | 254 255 |
   | UTF-16（小端序） | FF FE | 255 254 |
   | UTF-32（大端序） | 00 00 FE FF | 0 0 254 255 |
   | UTF-32（小端序） | FF FE 00 00 | 255 254 0 0 |
   | GB-18030 | 84 31 95 33 | 132 49 149 51 |

2. bug: md5 会因转换问题，出现 buf 和 txt 的值不同

```js
txt[0].codePointAt() // 查看 内码

// utf-8编码里 \uFEFF 是3字节！！！
const [n1, n2, n3] = new Uint8Array(this.response, 0, 3)
if (n1 === 0xef && n2 === 0xbb && n3 === 0xbf) decodedString = '\ufeff' + decodedString
// browser 里 TextDecoder()转换会丢弃 \uFEFF
```

UTF-8 以字节为编码单元，没有字节序的问题。 UTF-16 以两个字节为编码单元，在解释一个 UTF-16 文本前，首先要弄清楚每个编码单元的字节序。  
例如收到一个“奎”的 Unicode 编码是 594E，“乙”的 Unicode 编码是 4E59。  
如果我们收到 UTF-16 字节流“594E”，那么这是“奎”还是“乙”？

Unicode 规范中推荐的标记字节顺序的方法是 BOM。  
BOM 不是“Bill Of Material”的 BOM 表，  
而是 Byte Order Mark。  
BOM 是一个有点小聪明的想法：

在 UCS 编码中有一个叫做"ZERO WIDTH NO-BREAK SPACE"的字符，  
它的编码是 FEFF。  
而 FFFE 在 UCS 中是不存在的字符，所以不应该出现在实际传输中。

    UCS规范建议我们在传输字节流前，先传输字符"ZERO WIDTH NO-BREAK SPACE"。
      这样如果接收者收到FEFF，就表明这个字节流是Big-Endian的；
      如果收到FFFE，就表明这个字节流是Little-Endian的。
      因此字符"ZERO WIDTH NO-BREAK SPACE"又被称作BOM。
