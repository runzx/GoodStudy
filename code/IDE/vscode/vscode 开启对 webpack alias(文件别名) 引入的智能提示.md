# vscode 开启对 webpack alias(文件别名) 引入的智能提示

项目根目录下： jsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```

## 使用"include"属性
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es6"
  },
  "include": ["src/**/*"]
}
// exclude和include中的文件路径是相对于的位置的jsconfig.json
```
target	指定要使用的默认库（lib.d.ts）。  
值是"es3", "es5", "es6", "es2015", "es2016", "es2017", "es2018", "es2019", "es2020", "esnext".  
module	生成模块代码时指定模块系统。  
值是"amd", "commonJS", "es2015", "es6", "esnext", "none", "system", "umd".  

