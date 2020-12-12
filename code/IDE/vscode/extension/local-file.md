# 读取本地文件

1. 不能直接访问本地文件的，需要使用 vscode-resource 开头的地址。
2. 并且只能访问插件所在目录和当前工作区。
3. v1.38+

```js
const onDiskPath = vscode.Uri.file(path.join(context.extensionPath, 'media', 'cat.jpg'))

panel.webview.asWebviewUri(onDiskPath)
onDiskPath.with({ scheme: 'vscode-resource' })
```
