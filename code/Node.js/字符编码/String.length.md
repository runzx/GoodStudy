## String.length

JavaScript 使用 UTF-16 编码，
  该编码使用一个 16 比特的编码单元来表示大部分常见的字符  
  使用两个代码单元表示不常用的字符  

```js
'𠮷'.length // 2  用4字节
'𠮷'.codePointAt(0) // 134071

'翟'.length // 1  用2字节
'翟'.codePointAt(1) // undefined
```