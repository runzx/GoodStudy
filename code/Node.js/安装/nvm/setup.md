# nvm setup
1. curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
2. wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

## 科学上网
1. 打开共享 ss 
2. `curl -x socks5h://192.168.1.119:1080 https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh > nvm-install.sh`
   1. socks5h 远程dns
   2. 修改 nvm-install.sh 
      1. chmod +x nvm-install.sh
      2. 把sh里的download()加上socks5h proxy
3. 设置环境变量 NVM_NODEJS_ORG_MIRROR 为 https://mirrors.ustc.edu.cn/node/ 即可
   1. .bashrc `export NVM_NODEJS_ORG_MIRROR="https://mirrors.ustc.edu.cn/node/"`
```sh 
# nvm-install.sh
nvm_download() {
  if nvm_has "curl"; then
    curl --fail --compressed -q -x socks5h://192.168.1.119:1080 "$@"
  elif nvm_has "wget"; then

```

## curl 配置文件
1. .curlrc

```sh 
# .curlrc
proxy = "socks5h://192.168.1.119:1080"
# 如有这个文件，所有curl访问都会走代理

# 临时设置
env http_proxy=socks5h://localhost:8001 HTTPS_PROXY=socks5h://localhost:8001 ALL_PROXY=socks5h://localhost:8001 curl ....
```
## curl 使用环境变量
1. export http_proxy="http://user:pwd@127.0.0.1:1234"
2. export https_proxy="http://user:pwd@127.0.0.1:1234"
3. unset http_proxy 取消 http,https 代理
4. curl --noproxy "*" "http://httpbin.org/ip" 不使用代理