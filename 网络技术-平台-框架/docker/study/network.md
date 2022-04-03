# 外部访问 容器

1. -P -p 指定端口 映射
   1. -P 随机端口
   2. -p nnn 指定 `ip:hostPort:containerPort | ip::containerPort | hostPort:containerPort`
   3. 80:80/udp 指定 udp 端口
2. 查看 端口 配置
   1. docker port ID 80

## 容器 互联

1. 创建网络 docker network create -d bridge my-net
   1. -d 类型 bridge, overlay (swarm node)
   2. 默认为 bridge 172.17.0.0
   3. docker network ls 查看所有网桥
   4. docker inspect bridge 查看 某网桥 详情
   5. `docker network create --driver bridge --subnet 192.168.3.0/16 --gateway 192.168.3.0 zhai-home`
2. docker run -it --rm --name busybox1 --network my-net busybox sh
   1. 连接 到 my-net 网络
3. 再运行个容器，加入 my-net 网络 docker run -it -rm --name busybox2 --network my-net busybox sh

### brideg

1. 方便与微服务之间的互相通信，不需要再使用–link 进行双双指定连接。
2. 直接通过容器名就可以访问了
3. 默认为 bridge 172.17.0.0
4. 自动为每个容器分配置: 容器名 'ddf3a93736ad' ,hosts 里 绑定 从 172.17.0.2 起

### host 模式

1. host 模式就是创建的容器和宿主机共用同一个 Network Namespace，即容器使用宿主机的 IP 地址和端口。

### container 模式

1. 这个模式的容器将和已创建的容器共用同一个网络名称空间

### none 模式

1. none 模式的容器可以拥有独自的网络名称空间，但是在创建容器时并不会进行任何网络配置，
2. 即这个模式的容器没有网卡、IP、路由等信息，需要手动配置。
