## node 频繁重启问题排查

程序出现异常，未捕获，导致线程退出。  
Promise 状态为 rejected 未捕获异常，导致线程退出。  
发送退出信号，退出线程。 调用 process.ext()退出。

exited with code [0]，看到是正常退出

```js
process.on('exit', code => {
  console.log(`About to exit with code: ${code}`)
})
```

使用 pm2 以集群模式而不是 fork 模式运行该实用程序,该实用程序可以在不重新启动的情况下运行。
`exec_mode: 'cluster_mode'`  

### fork 与 cluster 启动模式

开发环境中多以 fork 的方式启动，生产环境中多用 cluster 方式启动

cluster 是 fork 的派生，cluster 支持所有 cluster 拥有的特性；

fork 不支持 socket 地址端口复用，cluster 支持地址端口复用。因为只有 node 的 cluster 模块支持 socket 选项 SO_REUSEADDR；

fork 不可以启动多个实例进程，cluster 可以启动多个实例  
而 cluster 只能应用于 node;  
fork 不支持定时重启，cluster 支持定时重启

### 日志问题

1. \$HOME/.pm2/目录下
2. pm2 自身的日志，存放于\$HOME/.pm2/pm2.log
3. pm2 所管理的应用的日志，存放于$HOME/.pm2/logs/目录下，标准谁出日志存放于${APP_NAME}\_out.log，标准错误日志存放于\${APP_NAME}\_error.log
