{
  "window.zoomLevel": 1,
  "editor": {
    "fontSize": 20,
    "tabSize": 2,
    "insertSpaces": true,
    "fontFamily": "Consolas, 'Courier New', monospace,'Fira Code','Input Mono','Inconsolata','Microsoft YaHei UI'",
    "formatOnSave": false,  // 不在保存时格式化，手工用ctrl+shift+L
  },
  "files.associations": {
    "*.cjson": "jsonc",
    "*.wxss": "css",
    "*.wxs": "javascript"
  },
  // 如项目下有.prettierrc.js 此处配置失效
  "prettier": {
    "singleQuote": true,
    "semi": false,
    "eslintIntegration": true,
    "bracketSpacing": true, //默认值，可不写
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,  // 保存时格式化，最好用手工ctrl shift L
  },
  // vetur 默认prettier，js 里格式化用下面配置 (要安装eslint插件)
  // eslintrc.js里不用再安装 'plugin:prettier/recommended',
  "eslint.validate": [
    // "javascript",
    // "javascriptreact",
    "vue"
  ],
  "vetur.format.defaultFormatterOptions": {
    "prettier": {
      "singleQuote": true,
      "proseWrap": "never",
      "printWidth": 130,
      "semi": false,
  }


}