# aria2 setup

1. `sudo apt-get install aria2`
2. `aria2c --enable-rpc --rpc-listen-all &`
3. `aria2c --conf-path=./.aria2/aria2.conf &`  
   `aria2c --conf-path=./.aria2/aria2.conf -D`

```conf
#允许rpc
enable-rpc=true
#允许非外部访问
rpc-listen-all=true
#RPC端口, 仅当默认端口被占用时修改
rpc-listen-port=6800

#最大同时下载数(任务数), 路由建议值: 3
max-concurrent-downloads=10
#断点续传
continue=true
#同服务器连接数
max-connection-per-server=10
#最小文件分片大小, 下载线程数上限取决于能分出多少片, 对于小文件重要
min-split-size=10M
#单文件最大线程数, 路由建议值: 5
split=10
#下载速度限制
max-overall-download-limit=0
#单文件速度限制
max-download-limit=0
#上传速度限制
max-overall-upload-limit=0
#单文件速度限制
max-upload-limit=0

#文件保存路径, 默认为当前启动位置
dir=/home/downloads

```

3. `https://github.com/ngosang/trackerslist` Tracker
   aria2.conf: bt-tracker=udp://p4p.arenabg.ch:1337/announce,http://p4p.arenabg.com:1337/announce
