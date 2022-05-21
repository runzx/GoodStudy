# mongod

1. -f 指定 启动配置文件
   1. --config
2. --port 默认 27017
3. --bind_ip 逗号分隔, 安全需要
4. --logpath 不指定要用 --syslog
5. --logappend 追加方式(默认 覆盖)
6. --pidfilepath pid 保存文件目录
7. --fork 后台运行
8. --auth 开启验证
9. --slowms arg=100 慢日志
   1. --profile 0 off, 1 slow, 2 all
10. --dbpath /data/db
11. --directoryperdb 每个库存不同目录
12. --noIndexByildRetry 创建索引失败不重试
13. --noprealloc 不预分配空间
14. --syncdelay 60 刷回硬盘时间间隔 0 只在内存中， 硬盘性能并，可减少些 40 秒？
15. --repair 修复库
16. --repairpath 修复保存新的目录
17. --jouranl 持久化重要的一步，最好打开
18. `--oplogSize xx` MB 的大小，默认 磁盘可用空间的 5%， 大些更好
19. `--replSet xx` 复制集的名称， 各机上要一样
20. `--replIndexPrefetch none|_id_only|all` 指定索引预提取行为
21.

## 配置文件

```yml
# conf 目录
# data 目录
# log 目录

# 主节点
systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

storage:
  dbPath: /var/lib/mongo
  journal:
    enabled: true
#  engine:
#  wiredTiger:

processManagement:
  fork: true # 后台运行
  pidFilePath: /var/run/mongodb/mongod.pid # location of pidfile
  timeZoneInfo: /usr/share/zoneinfo

net:
  port: 27017
  bindIp: 127.0.0.1, 172.18.87.34

# 复制集
replication:
  replSetName: brV2
  oplogSizeMB: 1024 # MB

security:
  # authorization: enabled
  # clusterAuthMode: keyFile
  # keyFile: /data/mongodb27001/conf/keyfile
```

### Primary + Secondary + Arbiter 的架构

### 常用 命令

0. mongo 172.18.87.32:27017/admin // 默认是 test 库
1. mongo --port 27017 -uroot -pxxx admin 登录 Mongodb
2. db.shutdownServer() 关闭 DB
3. mongod -f /xxx/mongod.conf 重启

## 启动 复制集

1. mongod -f ~/db/mongodb/conf/412.yml
2. rs.initiate()
   1. ok: 1 正常
   2. 命令提示符 变 brV2:SECONDARY
   3. 命令提示符 变 brV2:PRIMARY
   4. rs.conf() 查看配置
   5. rs.status() 查看状态 "myState" : 1：说明状态正常
3. 添加副本从节点
   1. rs.add(host, arbiterOnly)
      1. `rs.add("172.18.87.32:27017")`
      2. "ok" : 1：说明添加成功
      3. "stateStr" : "STARTUP2" -> "SECONDARY"
      4. rs.secondaryOk() 打开读权限
      5. rs.secondaryOk(false) 取消读权限
4. 添加仲裁节点
   1. rs.addArb(host)
      1. `rs.addArb("172.18.87.30:27017")`
   2. 如果没反应
      1. 在 主节点 设置
5. 主 节点 降为 从节点
   1. rs.stepDown(10) // 10s 默认60s, 要大于 secondaryCatchUpPeriodSecs 10 秒
```js
db.adminCommand({
  setDefaultRWConcern: 1,
  defaultWriteConcern: {
    w: 2
  }
})

// 一次初始化
config = {
  _id: 'brV2',
  members: [
    { _id: 0, host: '172.18.87.34:27017' },
    { _id: 1, host: '172.18.87.32:27017' },
    { _id: 2, host: '172.18.87.30:27017', arbiterOnly: true }
  ]
}

rs.initiate(config)
```

5.  移除 rs.remove("172.18.87.30:27017")

###

```js
rs.status()

"health" : 1,
// 代表机器正常
"stateStr" : "PRIMARY",
// 代表是主节点，可读写，其中有以下几下状态
1. STARTUP：刚加入到复制集中，配置还未加载
2. STARTUP2：配置已加载完，初始化；
3. RECOVERING：正在恢复，不适用读
4. ARBITER: 仲裁者
5. DOWN：节点不可到达
6. UNKNOWN：未获取其他节点状态而不知是什么状态，一般发生在只有两个成员的架构
7. REMOVED：移除复制集
8. ROLLBACK：数据回滚，在回滚结束时，转移到RECOVERING或SECONDARY状态
9. FATAL：出错。查看日志grep “replSet FATAL”找出错原因，重新做同步
10. PRIMARY：主节点
11. SECONDARY：备份节点

rs.conf() // 查看配置

//  重新配置
rs.config() // 会让联接断开一会，不要生产时使用
```

### 节点属性

1. 主节点 priority 至少为 1
2. 从节点 priority 可以为 0
3. 延迟节点 priority 为 0 且 slaveDelay = xx (有一定时间来切换 新的没有删除的主服务)
4. 隐藏节点 priority 为 0 且 hidden = true (对程序不可见，只是冗余)
5. 无索引 priority 为 0 且 buildIndexes= true (此节点用来备份，不查询)
6. 高性能节点 priority 可 >1 优先成为主
