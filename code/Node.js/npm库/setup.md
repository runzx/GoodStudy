# setup

```sh
# 查询npm全局目录
npm root -g

# 查询npm缓存目录
npm config get cache
# C:\Users\runzx\AppData\Roaming\npm-cache


npm config get registry
# 新的域名 registry.npm.taobao.org 域名将于 2022 年 05 月 31 日零时起停止服务。
npm config set registry https://registry.npmmirror.com

npm config set registry http://mirrors.cloud.tencent.com/npm/

# 项目下配置文件  .npmrc
registry=https://mirrors.cloud.tencent.com/npm/
# registry=https://registry.npmjs.org/
legacy-peer-deps=true


## yarn
# 项目下配置文件  .yarnrc
"registry" "https://repo.huaweicloud.com/repository/npm/"
"cache-folder" "~/.cache/yarn_cache"
# yarn不再支持 .npmrc 配置文件
# v2  .yarnrc.yml
# "Berry" 是 Yarn 2 发布序列的代号，同时也是我们的 代码仓库 的名称
yarn set version latest


yarn config get registry
yarn config set registry https://registry.npm.taobao.org/

yarn cache clean

```

### test

1. qq added 2214 packages from 1462 contributors and audited 2240 packages in 99--103s
2. ali 老是报错

3. ali yarn Done in 30.97s, npm 25s (qq 35s)
