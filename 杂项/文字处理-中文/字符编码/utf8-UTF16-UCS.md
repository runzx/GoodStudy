# utf8

1. Unicode 也是一种字符编码方法，不过它是由国际组织设计，可以容纳全世界所有语言文字的编码方案。  
   Unicode 的全称是  “Universal Multiple-Octet Coded Character Set”，简称为 UCS。  
   UCS 可以看作是 “Unicode Character Set” 的缩写。

2. 不过 UCS 只是规定如何编码，并没有规定如何传输、保存这个编码。  
   例如汉字 “超” 字的 UCS 编码是  8d85，  
   我们可以用 4 个 ascii 码来传输、保存这个编码；  
   也可以用 utf8 编码：3 个连续的字节 E8 B6 85 来表示它。  
   关键在于通信双方都要认可。

3. UTF-8（8-bit Unicode Transformation Format）是一种针对 Unicode 的可变长度字符编码，又称万国码。由 Ken Thompson 于 1992 年创建。  
   现在已经标准化为 RFC 3629。UTF-8 用 1 到 6 个字节编码 Unicode 字符。用在网页上可以统一页面显示中文简体繁体及其它语言（如英文，日文，韩文）。

4. 每个使用 UTF-8 存储的字符，除了第一个字节外，其余字节的头两个比特都是以 “10” 开始，这样的好处是当 UNICODE 文件中只有 ASCII 码时，存储的文件都为一个字节，所以就是普通的 ASCII 文件无异，读取的时候也是如此，所以能与以前的 ASCII 文件兼容。

非 ascii 字符编码多于 1 个字节，排序如下：  
110xxxxx 10xxxxxx ... 2 进制表示

汉字 “超” 字的 UCS 编码是  \0x8d85 ：  
utf8: 11101000 10110110 10000101

# UTF-16

1. UTF-16 是另一种非常流行的 Unicode 编码。 例如，这就是 Java 在内部表示任何字符的方式。 它也是 JavaScript 内部使用的两种编码之一 ，以及 UCS-2 。 它也被许多其他系统使用，例如 Windows。

2. UTF-16 is a variable length encoding system, like UTF-8, but uses 2 bytes (16 bits) as the minimum for any character representation. As such, it’s backwards incompatible with the ASCII standard.  
   UTF-16 是一种可变长度编码系统，与 UTF-8 类似，但是对于任何字符表示形式，最少使用 2 个字节(16 位)。 因此，它向后与 ASCII 标准不兼容。

3. Code points in the Basic Multilingual Plane (BMP) are stored using 2 bytes. Code points in astral planes are stored using 4 bytes.
   基本多语言平面(BMP)中的代码点使用 2 个字节存储。  
   星体平面中的代码点使用 4 个字节存储。
