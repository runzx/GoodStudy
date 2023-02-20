# 开发中 环境变量
1. vscode
   1. launch.json 

```json
{
  "env": {
    "NODE_ENV": "development",  // production
  },
}

// package.json:
"scripts": {
    "dev": "cross-env NODE_ENV=development webpack-dev-server --inline --hot --port 8086",
    "build": "cross-env NODE_ENV=production webpack --progress --hide-modules"
}
```

```js

if (process.env.NODE_ENV === 'development') {
  
}

```