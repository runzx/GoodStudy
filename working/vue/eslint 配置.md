
## vscode 里配置 保存时自动修正格式错误
要先安装全局eslint  
vscode 上安装 eslint, vetur  

```JS
"eslint.validate": [
        "javascript",
        "javascriptreact",
        { "language": "vue", "autoFix": true },
        { "language": "html", "autoFix": true }
    ],
    "eslint.options": {
        "configFile": "D:/zx/github/test/CMS/vue-admin-template/.eslintrc.js",
    },
```
## vscode 禁止tab转空格
```editor.detectIndentation": false,```  
