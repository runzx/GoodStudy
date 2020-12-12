# commands

1. 清单声明 package.json

```json
{
  "contributes": {
    "commands": [
      {
        "command": "xx.yyy",
        "title": "Hello World"
      }
    ]
  }
}
```

2. code

```js
const disposable = vscode.commands.registerCommand('xx.yyy', () => {
  // 命令体
})

context.subscriptions.push(disposable)
// 作用是当扩展禁用时会调用 dispose()方法

// disposable 如是自定义对象，要加方法 dispose()

// 使用的各类资源利用 dispose pattern 来进行释放。应用于事件监听、命令、UI 交互等
// 一次性应用 最好用 subscriptions 注册，以便在卸载扩展程序时可以正确清理它们， 否则 启用和禁用扩展程序而无需重新启动vscode的情况下，可能会导致问题
```

3. 回调函数 参数 uri

   当从资源管理器中右键执行命令时会把当前选中资源路径 uri 作为参数传过；
   当从编辑器中右键菜单执行时则会将当前打开文件路径 URI 传过去；
   当直接按 Ctrl+Shift+P 执行命令时，这个参数为空；

4. debug  
   开发者控制台 ctrl+shilt+I (浏览器的 F12)  
   WebView 控制台 Ctrl+Shift+P 然后执行打开 Webview 开发工具 (Open Webview Developer Tools)

5. dir  
   Windows 系统：%USERPROFILE%\.vscode\extensions  
   Mac/Linux：~/.vscode/extensions

6.

```js
// 加载文档并返回一个TextDocument对象
vscode.workspace.openTextDocument('someFilePath').then(document => {
  // 在vscode中打开一个文档
  vscode.window.showTextDocument(document, editor => {
    // 可以操作文档的editor对象
  })
})
// 等价
vscode.window.showTextDocument(vscode.Uri.file('someFilePath'), editor => {
  // 可以操作文档的editor对象
})
```

7. 工程根目录的获取
   vscode 以前有一个 vscode.workspace.rootPath，由于后来 vscode 支持 multipleRoot 模式，所以这个字段已经过时作废了。
   vscode.workspace.workspaceFolders 可以获取当前工作区所有根文件夹数组

```js
/**
 * 获取当前所在工程根目录，有3种使用方法：
 * getProjectPath(uri) uri 表示工程内某个文件的路径
 * getProjectPath(document) document 表示当前被打开的文件document对象
 * getProjectPath() 会自动从 activeTextEditor 拿document对象，如果没有拿到则报错
 * @param {*} document
 */
getProjectPath(document) {
    if (!document) {
        document = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.document : null;
    }
    if (!document) {
        this.showError('当前激活的编辑器不是文件或者没有文件被打开！');
        return '';
    }
    const currentFile = (document.uri ? document.uri : document).fsPath;
    let projectPath = null;

    let workspaceFolders = vscode.workspace.workspaceFolders.map(item => item.uri.path);
    // 由于存在Multi-root工作区，暂时没有特别好的判断方法，先这样粗暴判断
    // 如果发现只有一个根文件夹，读取其子文件夹作为 workspaceFolders
    if (workspaceFolders.length == 1 && workspaceFolders[0] === vscode.workspace.rootPath) {
        const rootPath = workspaceFolders[0];
        var files = fs.readdirSync(rootPath);
        workspaceFolders = files.filter(name => !/^\./g.test(name)).map(name => path.resolve(rootPath, name));
        // vscode.workspace.rootPath会不准确，且已过时
        // return vscode.workspace.rootPath + '/' + this._getProjectName(vscode, document);
    }
    workspaceFolders.forEach(folder => {
        if (currentFile.indexOf(folder) === 0) {
            projectPath = folder;
        }
    })
    if (!projectPath) {
        this.showError('获取工程根路径异常！');
        return '';
    }
    return projectPath;
},
```

8.  监听器  
    vscode.languages.registerCompletionItemProvider()  
    vscode.commands.registerCommand()  
    vscode.languages.registerCodeActionsProvider()  
    vscode.languages.registerCodeLensProvider()  
    vscode.languages.registerHoverProvider()
