# 外部访问 容器
1. -P -p 指定端口 映射
   1. -P 随机端口
   2. -p nnn 指定 `ip:hostPort:containerPort | ip::containerPort | hostPort:containerPort`
   3. 80:80/udp 指定udp端口
2. 查看 端口 配置
   1. docker port ID 80
## 容器 互联
1. 创建网络 docker network create -d bridge my-net
   1. -d 类型 bridge, overlay (swarm node)
2. docker run -it --rm --name busybox1 --network my-net busybox sh
   1. 连接 到 my-net网络
3. 再运行个容器，加入 my-net网络 docker run -it -rm --name busybox2 --network my-net busybox sh