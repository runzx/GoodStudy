# pnpm setup
1. `npm i -g pnpm`
2. pnpm dlx 相当 npx 

```sh
# cache dir
pnpm  config set cache-dir 'c:\zx\pnpm\cache'
pnpm  config set store-dir 'c:\zx\pnpm\store'
pnpm  config set state-dir 'c:\zx\pnpm\state'

```
## npm
1. npm run <cmd>  --> pnpm <cmd>
2. npm i <kg>  --> pnpm add <pkg>
3. npm install --> pnpm i
4. pnpm update 根据指定的范围更新软件包的最新版本
   1. pnpm up --latest	更新所有依赖项，此操作会忽略 package.json 指定的范围
   2. pnpm up foo@2	    将 foo 更新到 v2 上的最新版本
   3. pnpm up "@babel/*"	更新 @babel 范围内的所有依赖项
5. pnpm prune 移除不需要的软件包
6. pnpm remove  从 node_modules 和项目的 package.json 中移除包 (rm, uninstall, un)
   1. --global, -g    从全局删除一个依赖包
   2. --save-dev, -D  仅删除开发环境 devDependencies 中的依赖项
   3. --save-optional, -O 仅移除 optionalDependencies 中的依赖项
   4. --save-prod, -P   仅从 dependencies 中删除相关依赖项
   5. 