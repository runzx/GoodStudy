<!--
 * @Author: zhaix
 * @Date: 2022-03-28 11:14:21
 * @LastEditTime: 2022-04-19 11:28:12
 * @LastEditors: Do not edit
 * @FilePath: \goodstudy\网络技术-平台-框架\docker\setup\centos7安装.md
 * @Description: 
-->
# centOS7 安装

1. 删除旧版 
```bash
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```
2. 为了方便添加软件源, 支持 devicemapper 存储类型, 安装如下软件包
```sh
sudo yum update
sudo yum install -y yum-utils 

  # device-mapper-persistent-data \
  # lvm2

# 添加 yum 软件源
# 添加 Docker 稳定版本的 yum 软件源
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo

# 注意18.01.0版本的docker不需要额外配置devicemapper, 执行如下命令可使用lvm2, 避免lvm性能低下问题. 
# 用下面阿里镜像, 速度快
sudo yum-config-manager \
    --add-repo \
    https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo

# 设置镜像
vi /etc/docker/daemon.json

{
  "registry-mirrors": ["https://aj2rgad5.mirror.aliyuncs.com"]
}
#  命令方式
curl -sSL https://get.daocloud.io/daotools/set_mirror.sh | sh -s http://2be16b36.m.daocloud.io

# 加入 docker 用户组命令
# sudo usermod -aG docker USER_NAME

#  repo 中列出可用版本
yum list docker-ce --showduplicates | sort -r
# 安装 Docker 引擎
sudo yum install docker-ce docker-ce-cli containerd.io
# 限定的包名称安装特定版本
sudo yum install docker-ce-<VERSION_STRING> docker-ce-cli-<VERSION_STRING> containerd.io
# 启动 docker
sudo systemctl start docker

# test
sudo docker run hello-world
```



// dell 5460上的版本信息：
docker  Server Version: 18.09.7
  Kernel Version: 3.10.0-957.el7.x86_64 

3. 安装docker的先决条件：
  1. 必须是64位CPU架构的计算机, Docker目前不支持32位CPU；
  2. 运行Linux3.8或更高版本内核, CentOS时内核必不小于3.10；
  3. 内核必须支持一种合适的存储驱动, 可以是Device Manager、AUFS、vfs、btrfs、以及默认的驱动Device Mapper中的一个；
  4. 内核必须支持并开启cgroup和命名空间namespace功能. 

4. 检查Device Mapper
  - `ls -l /sys/class/misc/device-mapper`
  - docker 的本地文件, 包括镜像(images), 容器(containers), 存储卷(volumes)等, 都需要手工删除. 
  默认目录存储在 /var/lib/docker. 
5. 升级 Docker 引擎
   1. yum -y upgrade

6. 卸载 Docker 引擎
   1. sudo yum remove docker-ce docker-ce-cli containerd.io
   2. sudo rm -rf /var/lib/docker
   3. sudo rm -rf /var/lib/containerd

7. 在 Debian 和 Ubuntu 上，Docker 服务默认配置为在启动时启动。要为其他发行版在启动时自动启动 Docker 和 Containerd，请使用以下命令
   1. sudo systemctl enable docker.service
   2. sudo systemctl enable containerd.service