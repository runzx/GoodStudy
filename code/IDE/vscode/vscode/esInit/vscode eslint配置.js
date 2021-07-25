/* 
eslint.provideLintTask: 扩展是否为整个工作区文件夹提供lint任务。
eslint.packageManager: 控制用于解析ESLint库的包管理器。 这仅在ESLint库全局解析时才有影响。 有效值为 "npm" 或者 "yarn" 。
eslint.options: 配置如何使用 ESLint CLI引擎 API 启动ESLint的选项。 默认为空选项包
eslint.workingDirectories - 要使用的工作目录的array 。 ESLint解析与工作目录相对应的配置文件。 这个新设置允许用户控制哪个工作目录用于哪个文件。

这里扩展将以下命令提供给命令选项板。
  Create'.eslintrc.json'file: 创建一个新的.eslintrc.json 文件。
  Fix all auto-fixable problems ：将ESLint自动修复解决方案应用到所有可以修复的问题。
  Disable ESLint for this Workspace ：禁用这里工作空间的ESLint扩展。
  Enable ESLint for this Workspace ：启用这里工作空间的ESLint扩展。
 */
// 翟享 user settings:
{
  "window.zoomLevel": 1,
  "editor.fontSize": 18,
  "files.associations": {
    "*.cjson": "jsonc",
    "*.wxss": "css",
    "*.wxs": "javascript"
  },
  "emmet.includeLanguages": {
    "wxml": "html"
  },
  "minapp-vscode.disableAutoConfig": true,
  "editor.tabSize": 2,
  "eslint.autoFixOnSave": true,
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      //js-beautify-html格式化配置，属性强制换行
      "wrap_attributes": "force-aligned"
    },
    "prettyhtml": {
      "printWidth": 100,
      "singleQuote": false
    },
    "js": "prettier"
  },
  "prettier.disableLanguages": [],
  "prettier.tslintIntegration": true,

  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "vue",
      "autoFix": true
    },
    "html"
  ],
  "editor.formatOnSave": false,
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "beautify.language": {

    "css": [
      "css",
      "scss"
    ],
    "html": [
      "htm",
      "html"
    ]
  },
  "eslint.options": {
    "configFile": "d:/zx/code/.eslintrc.js"
  },
  "eslint.run": "onSave",
  "prettier.semi": false,
  "javascript.format.enable": false,
  "editor.fontFamily": "Consolas, 'Courier New', monospace,'Fira Code','Input Mono','Inconsolata'"
}
// win10下用户内有效配置路径：
  C:\Users\runzx\AppData\Roaming\Code\User\settings.json