# setup

```sh
npm config get registry

# 新的域名 registry.npm.taobao.org 域名将于 2022 年 05 月 31 日零时起停止服务。
npm config set registry https://registry.npmmirror.com


npm config set registry http://mirrors.cloud.tencent.com/npm/

# 项目下配置文件  .npmrc
registry=https://mirrors.cloud.tencent.com/npm/
# registry=https://registry.npmjs.org/
legacy-peer-deps=true


## yarn
yarn config get registry
yarn config set registry https://registry.npm.taobao.org/

yarn cache clean

```

### test

1. qq added 2214 packages from 1462 contributors and audited 2240 packages in 99--103s
2. ali 老是报错

3. ali yarn Done in 30.97s, npm 25s (qq 35s)
