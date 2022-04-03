# 容器 container
1. 实质是进程，隔离的环境里
   1. 自己的独立的 命名空间。因此容器可以拥有
   2. 自己的 root 文件系统、自己的网络配置、自己的进程空间，甚至自己的用户 ID 空间。
2. 容器运行时，是以镜像为基础层，在其上创建一个当前容器的存储层，我们可以称这个为容器运行时读写而准备的存储层为 容器存储层
   1. 容器消亡时，容器存储层也随之消亡
   2. 容器存储层要保持无状态化
3.  数据卷（Volume）、或者 绑定宿主目录
    1.  数据卷的生存周期独立于容器，容器消亡，数据卷不会消亡
4.  启动
    1.  docker run --name xxx imagesName
    2.  docker run -t -i ubuntu:18.04 /bin/bash 
        1.  启动一个 bash 终端，允许用户进行交互
        2.  -t 选项让Docker分配一个伪终端（pseudo-tty）并绑定到容器的标准输入上， 
        3.  -i 则让容器的标准输入保持打开。
    3.  启动已终止容器
        1.  `docker container start containerID | containerName`
        2.  `docker container restart containerID`
5.  守护态运行
    1.  后台运行而不是直接把执行命令的结果输出在当前宿主机下
    2.  `-d` 参数来实现
    3.  容器是否会长久运行，是和 docker run 指定的命令有关，和 -d 参数无关。
    4.  输出结果 查看: `docker logs containerID | containerName` 
        1.   -n100 显示最后 100行
6.  终止
    1.  `docker container stop containerID | containerName`
    2.  `docker stop containerID | containerName`
    3.  `docker stop $(docker ps -q)`停止所有容器
7.  查看 
    1.  `docker container ls -a` all
    2.  `docker container ls -l` latest 
    3.  `docker system df`  查看 镜像 尺寸
8.  进入容器
    1.  `docker exec -it containerID bash`
    2.  ps -ef 可以看到所有进程
    3.  free 主机的内存
    4.  top 容器 空间的， pid 是此容器内进程，与主机进程 pid不同，CPU，mem 和主机上一样。
    5.  stdin 中 exit，不会导致容器的停止
9.  导出和导入
    1.  docker export containerID > xx.tar
    2.  docker import 
10. 删除 容器
    1.  docker container rm containerID | containerName
    2.  -f 发送 SIGKILL 信号给容器
    3.  清理终止状态的容器: `docker ontainer prune`