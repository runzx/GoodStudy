## 使用 Excel 打开 csv 文件出现乱码，通常是由于文件编码不匹配导致的。常见的两种编码：

UTF-8：macOS 和 Node.js 环境的默认编码。macOS 和 Windows 的 Excel 打开是乱码。  
GBK：macOS 和 Windows 的 Excel 打开可以正确显示。在 macOS 的「预览」中显示乱码。

1.

```js
import * as fs from 'fs'
import * as iconv from 'iconv-lite'

fs.writeFileSync(filename, iconv.encode(str, 'gbk'))
```

2. Excel 并非不认识 UTF-8，而是不认识 UTF-8 without BOM。如果 UTF-8 文件带有 BOM 头，则 Excel 可以正确识别和打开

```js
import * as fs from 'fs'

fs.writeFileSync(filename, '\ufeff')
fs.appendFileSync(filename, str)
```
