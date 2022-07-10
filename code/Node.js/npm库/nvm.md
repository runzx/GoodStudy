# nvm

## windows

1. `https://github.com/coreybutler/nvm-windows`
2. NVM_SYMLINK 环境变量(nodejs 的路径)安装时一定要指向空目录，这是个 符号链接 (否则报错'exit status 145: The directory is not empty.')
   1. NVM_SYMLINK='C:\tools\nvm\nodejs'
   2. NVM_HOME='C:\tools\nvm'
   3. 这 2 个环境变量会自动加入系统中，注意 PATH 里不能有比它更前位置的和 nodejs,npm 相关路径，
3. `nvm ls available`查看把有可安装版本
4. `nvm install lts`,(lts, latest, newest)
   1. `npm i -g yarn` 查看系统 PATH 里的 yarn 路径，保证不在 'C:\tools\nvm\nodejs\yarn' 前
   2. 全局 包要各自安装
5. `nvm use 16.13.2` 切换版本，要 用新终端
6. `nvm node_mirror <node_mirror_url` nodejs 镜像
7. `nvm npm_mirror <npm_mirror_url>` npm 镜像
   1. node_mirror: https://npm.taobao.org/mirrors/node/
   2. npm_mirror: https://npm.taobao.org/mirrors/npm/
   3. 配置文件 settings.txt
8. err: status 1: 用管理员身份运行
9. `yarn config set registry https://registry.npmmirror.com`