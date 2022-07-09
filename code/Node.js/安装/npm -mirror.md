# 国内优秀 npm 镜像推荐及使用

1.  临时使用
    - npm --registry https://registry.npm.taobao.org install express
2.  持久使用

    - `npm config set registry http://mirrors.cloud.tencent.com/npm/`
    - `npm config set registry http://registry.npmmirror.com`
    - 验证是否成功 npm config get registry
      - 或 npm info express

3.  通过 cnpm 使用
    - cnpm install express
    - npm install -g cnpm --registry=https://registry.npm.taobao.org
4.  升级
    - npm install npm@latest -g
