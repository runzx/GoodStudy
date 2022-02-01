# virtual documents

1. workspace.registerTextDocumentContentProvider(myScheme, myProvider)

```js
const myProvider = class implements vscode.TextDocumentContentProvider {
    provideTextDocumentContent(uri: vscode.Uri): string {
        // 简单调用cowsay, 直接把uri-path当做文本内容
        return cowsay.say({ text: uri.path });
    }
};

workspace.registerTextDocumentContentProvider(myScheme, myProvider)

// 创建一个uri，然后编辑器就能显示
vscode.commands.registerCommand('cowsay.say', async () => {
    let what = await vscode.window.showInputBox({ placeHolder: 'cow say?' });
    if (what) {
        let uri = vscode.Uri.parse('cowsay:' + what);
        let doc = await vscode.workspace.openTextDocument(uri); // 调用供应器函数
        await vscode.window.showTextDocument(doc, { preview: false });
    }
});
```

2. URI Scheme(协议)  
   通用格式：`scheme:[//[user:password@]host[:port]][/]path[?query][#fragment]`

3. 更新虚拟文档

```js
const myProvider = class implements vscode.TextDocumentContentProvider {
  // 事件发射器和事件
  onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
  onDidChange = this.onDidChangeEmitter.event;
  //...
};
```
