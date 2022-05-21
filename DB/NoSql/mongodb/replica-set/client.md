#　联接 复制集

1. mongodb://[username:password@]host1[:port1],host2[:port2],...[,hostN[:portN]]][/[database][?options]]
   1. `mongodb://10.9.149.246,10.9.6.114,10.9.183.226/?replicaSet=udb-5x15saxi`
   2. replicaSet=xxxx 副本集名称 关键参数
   3. IP 列表不需要全部列全，只需 超过 1 个节点的 IP， client 自动去询问对应节
2. 读写分离, readPreference 参数能够实现 写操作 在 主库 进行，读操作 在 从库 进行的 `读写分离` 功能
   1. primary: 读请求全部走 primary (secondary 节点纯粹是做高可用的容灾使用)
   2. secondary: 写请求全部走 primary，读请求全部走 secondary: 读写分离集群
      1. 缺点是可能读到的数据和主库是不一致的。所以在对于数据一致性有较高的场景下慎用。
      2. 能提高读操作的吞吐（通过添加多个 secondary 的方法）
   3. primaryPreferred: 优先走 primary，只有少数情况才去 secondary 读取数据
   4. secondaryPreferred: 优先走 secondary，只有少数情况才去 primary 读取数据
   5. nearest：根据客户端到各个节点的延时选择节点：如果延时在某个阈值内，随机选择节点；如果所有节点延时在某个阈值外，选择延时最小的
3. 复制集里 Primary 节点是不固定的

## mongoose
1. 指定单机：
   1. mongoose.connect('mongodb://host1:port1/?replicaSet=rsName');
2. 复制集
   1. mongoose.connect('mongodb://user:pw@host1.com:27017,host2.com:27017,host3.com:27017/testdb');