# 创建

1. docker volume create my-vol
2. docker volume ls
3. docker volume inspect my-vol // 查看状态
4. 挂载 数据卷
   1. --mount source=my-vol, target=/usr/share/html
   2. 在 docker run 时用
   3. -v (docker v17+) 由(:)分隔的三个字段组成，卷名:容器路径:选项列表。选项列表可以 `ro/rw`
      1. `docker run -d -v myvol:/app nginx:latest`
5. 挂载 主机目录 作 数据卷
   1. --mount type=bind, source=/src/webapp, target=/usr/share/html
   2. readonly 参数为 只读
6. 挂载 主机文件 为 数据卷
   1. --mount type=bind, source=$HOME/.bash_history, target=/root/.bash_history
7. docker volume rm my-vol
8. docker volume prune //清理无主数据卷
9. docker rm -v // 删除容器的同时移除数据卷
