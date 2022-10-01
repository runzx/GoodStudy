# 优雅退出(适度处理)

1. 粗鲁关闭服务， 污染依赖数据库等状态服务
2. 处理异常最后一步，保证用户体验，避免出现脏数据或业务逻辑问题

## 退出 信号

1. 信号 是异步通知
2. SIGTERM 可以监听此信号
3. SIGKILL 强至性， 不能响应或忽略此信号
4. SIGINT ctrl+C
5. SIGQUIT ctrl+\

## http

1. 不监听 端口，不会有新请求
2. 处理完已进入的请求
3. nodej http close()

```js
process.on('SIGTERM', () => {
  server.close(() => {
    process.exit(1)
  })
})
```

## 集群方式下 优雅退出

1. worker 异常退出 后要 refork
2. 监听 master 退出信号
3. master 退出前 kill 所有 worker
4. worker 退出前 close server 和 worker 的子进程

```js
// 集群方式下 优雅退出
// worker 异常退出
cluster.on('exit', (worker, code, signal) => {
  console.log(`Worker ${worker.process.pid} died, code: ${code}, signal: ${signal}`)

  worker.removeAllListeners()
  console.log('==== Refork ====')
  // refork a new worker
  cluster.fork()
})

// 监听master 退出信号
async function onMasterSignal() {
  const killsCall = Object.keys(cluster.workers).map(id => {
    const worker = cluster.workdrs[id]
    const { pid } = worker.process
    return process.kill(parseInt(pid, 10), signal)
  })

  await Promise.all(killsCall)
}
// kill 2 ctrl+C 3 ctrl+\ 15 default
;['SIGINT', 'SIGQUIT', 'SIGTERM'].forEach(signal => {
  process.once(signal, onMasterSignal)
})

// worker close 一个连接
process.on('SIGTERM', () => {
  console.log(`Only graceful shutdown, worker ${process.pid}`)
  close()
})
function close() {
  const { worker } = cluster
  if (worker) {
    try {
      server.close(() => {
        try {
          worker.send({ message: 'disconnect' })
          worker.disconnect() // 关闭和master的连接
        } catch (error) {
          console.error('Error on worker disconnect')
        }
      })
    } catch (error) {
      console.error('Error on server close')
    }
  }
}

// 要优雅地关闭应用程序，您可以捕获SIGINT信号（PM2 在退出时发送的第一个信号）
```

## 灰度发布 过程

1. 金丝雀发布: 原版本可用下，同时部署一个新版本
2. nginx nodej 实现方式

```conf
upstream nginx_canary {
    ; server nodejs:8080 weight=100;
    ; server nodejs2:8081 down;   # 不接收连接
    ; backup： 其他全部的非backup机器down或者忙的时候，请求backup机器。
    server app3:5858 weight=90;
    server app2:5858 weight=10;   # 接收10%连接
}

server {

    location @nodejs {
        proxy_pass http://nginx_canary;
    }
}

; nginx 动态加载配置文件
nginx -s reload
; 或
kill -HUP 主进程号
; 重启日志文件，备份日志文件时常用：nginx -s reopen 或者 kill -USR1 主进程号
```

## 蓝绿发布

1. 共存 2 个版本
2. 切换
3. AB test : 对照实验、双盲实验、随机实验、在线田间实验

## 健康检查

## pm2 fraceful shutdown

```js
process.on('SIGINT', function () {
  db.stop(function (err) {
    process.exit(err ? 1 : 0)
  })
})
```
