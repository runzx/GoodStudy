## wsl setup
`nano /etc/apk/repositories`  源  

http://dl-cdn.alpinelinux.org/alpine/v3.12/main  
http://dl-cdn.alpinelinux.org/alpine/v3.12/community  

http://mirrors.aliyun.com/alpine/v3.9/main  
http://mirrors.aliyun.com/alpine/v3.9/community  

v3.9 为mongodb  
apk add yaml-cpp=0.6.2-r2 // 必须将版本固定到0.6.2- 否则mongo将导致动态链接失败。  

http://dl-cdn.alpinelinux.org/alpine/v3.12/edge
nodejs v12.18  最新版  