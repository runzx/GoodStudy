# backup store data volume

1. `--volumes-from` 标志创建一个安装该卷的新容器
2. `docker run -v /dbdata --name dbstore ubuntu /bin/bash` 创建容器 dbstore
3. `docker run --rm --volumes-from dbstore -v $(pwd):/backup ubuntu tar cvf /backup/backup.tar /dbdata`
   1. 启动 容器 并装入卷 dbstore
   2. 主机 `./` 挂载为 容器的 /backup
   3. 将卷内数据/dbdata  打包到 /backup/backup.tar 也就打包到主机当前目录下的backup.tar
