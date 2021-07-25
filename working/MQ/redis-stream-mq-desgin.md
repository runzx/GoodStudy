# mq 设计

1. while block 等待，要单独的 redis.client ,不然会影响其它的操作
2. 每个 block 单独 client, xadd, xack 用其它 client
3. psubscriber 单独 client
4. client.duplicate() 不会与其它冲突
5. subscribe 和 psubscribe 的区别是，前者指定具体的通道名称，而后者可以指定一个正则表达式，匹配这个表达式的通道都被订阅。
6. 执行 SUBSCRIBE 命令后，client 会进入发布订阅模式，在此模式中只能执行与发布订阅相关的命令
