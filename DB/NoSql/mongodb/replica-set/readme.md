# mongodb 复制集 副本集 replica set (Replication)

1. 相同数据 集合 服务器集群 主从
2. 数据节点， 投票节点
3. 主(唯一，不是固定，可选举) 写操作: 写 进入 oplog 中
4. 从 不能写入
5. 健康节点 小于 一半时，不可写，只可读

## 配置
1. replSet=xxx 所有复制集 此名要一样

## command
1. rs.stepDown(50) 50s内降级为从节点
