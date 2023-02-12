# 环境变量和模式
1. import.meta.env 对象上暴露环境变量: Ex:`import.meta.env.MODE`
   1. MODE: {string} 应用运行的模式。
   2. BASE_URL: {string} 部署应用时的基本 URL。他由base 配置项决定。
   3. PROD: {boolean} 应用是否运行在生产环境。
   4. DEV: {boolean} 应用是否运行在开发环境 (永远与 import.meta.env.PROD相反)。
   5. SSR: {boolean} 应用是否运行在 server 上。

## .env 文件
1. Vite 使用 dotenv 从你的 环境目录 中的下列文件加载额外的环境变量
2. 一份用于指定模式的文件（例如 .env.production）会比通用形式的优先级更高（例如 .env）
3. 为了防止意外地将一些环境变量泄漏到客户端，只有以 VITE_ 为前缀的变量才会暴露给经过 vite 处理的代码
   - 只有 VITE_SOME_KEY 会被暴露为 import.meta.env.VITE_SOME_KEY 提供给客户端源码
4. 要在环境变量中使用 $ 符号，则必须使用 \ 对其进行转义

```sh
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略

# .env.staging
VITE_APP_TITLE=My App (staging)
```

## 模式
1. 默认情况下，开发服务器 (dev 命令) 运行在 development (开发) 模式，而 build 命令则运行在 production (生产) 模式
2. 当执行 vite build 时，它会自动加载 .env.production 中可能存在的环境变量
   - --mode 选项标志来覆盖命令使用的默认模式 
   - `vite build --mode staging`  staging （预发布）