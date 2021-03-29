#

```js
options = {
  value: '', // string|CodeMirror.Doc, 编辑器的起始值
  mode: { name: 'javascript', json: true }, // string|object
  indentUnit: 2, // 缩进空格
  smartIndent: true, // 上下文相关的缩进
  tabSize: 4,
  keyMap: 'default', // emacs sublime vim
  extraKeys: { 'Ctrl-/': 'autocomplete' }
}
```

## event

1. "change" (instance: CodeMirror, changeObj: object)
   每次更改编辑器的内容时 ​​ 触发。
2. "focus" (instance: CodeMirror, event: Event)
   只要编辑器集中精力，就会触发。
3. "blur" (instance: CodeMirror, event: Event)
   每当编辑器不集中时触发。
4. "scroll" (instance: CodeMirror)
   滚动编辑器时触发。
5. "refresh" (instance: CodeMirror)
   刷新 或调整编辑器大小时触发。在使取决于编辑器或字符大小的缓存值无效时最有用。

## api
1. getValue():获取编辑器文本
2. setValue(textString):设置编辑器文本
3. undo():撤销一个编辑器
4. redo():重做一个编辑器
5. setSelection({line:startLineNumber,ch:start_ch},{line:endLineNumber,ch:end_ch});设置一个新的编辑器
6. getLine(Integer):获取第n行的文本内容
7. replaceRange(str1,{line,ch},{line,ch},str2):替换str1中一部分代码为str2
8. lineCount():获取编辑器总行数 
9. replaceSelection(str1,str2):替换所选内容

