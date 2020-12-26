// GB2312 < GBK < GB18030
// GB2312 6763个汉字，2内码
// GBK 即汉字内码扩展规范， 21886 个汉字和图形符号：GB2312 中的全部汉字，BIG5 中的全部汉字
// GBK 采用双字节表示
// GB18030 与 GB2312-1980 和 GBK 兼容，共收录汉字70244个
// 1/2/4字节变长编码
const file = 'demo.txt'  // windows 下的 GB2312保存
let buf = fs.readFileSync(file) // { encoding: 'utf8' } 不设encoding,buffer读出
let str = iconv.decode(buf, 'GB18030') // GB2312, GBK, GB18030都可以正确转换utf8

let b = iconv.encode(str, 'GB2312') // b是一个buffer，存储的是str的GB2312编码的二进制
fs.writeFile('./xx.txt', b) // 将str的GB2312编码数据写入到文件中
