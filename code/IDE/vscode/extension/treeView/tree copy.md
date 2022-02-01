# treeData

1. TreeDataProvider 要 2 方法
   1. getChildren(element?: T): ProviderResult<T[]>
   2. getTreeItem(element: T): TreeItem | Thenable<TreeItem>
2. 打开树视图，getChildren 会被自动调用（没有参数），你可以在这里返回树视图的第一层级内容。
3. 注册 Provider
   1. vscode.window.registerTreeDataProvider() 视图 ID 和数据 provider 对象
   2. vscode.window.createTreeView()
4. onDidChangeTreeData?: Event<T | undefined | null | void>：当依赖数据变更并且你希望更新树视图的时候执行

```js
_onDidChangeTreeData: vscode.EventEmitter = new vscode.EventEmitter();
onDidChangeTreeData: vscode.Event = this._onDidChangeTreeData.event;

refresh(): void {
    this._onDidChangeTreeData.fire();
}

```

## 以按钮方式

```js
// package.json
"menus": {
    "view/title": [
        {
            "command": "nodeDependencies.refreshEntry",
            "when": "view == nodeDependencies",
            "group": "navigation"
        },
    ]
}

```

## 创建视图容器

```js
// package.json
"contributes": {
    "viewsContainers": {
        "activitybar": [{
            "id": "package-explorer",
            "title": "Package Explorer",
            "icon": "media/dep.svg"
        }]
    }
}


```
