# docker 数据

1. volumes 卷
   1. docker 管理， 只有 docker 进程可以访问
   2. /var/lib/docker/volumes/下
   3. 独立于容器, `docker volume create` 显示创建; 也在容器或服务创建期间创建卷
   4. 命名 或 匿名(uuid); `-v` `--volume` `--mount`(更详细命令， key=value)
   5. 三字段组成 `name:/etc/redis:ro`
   6. 查看卷 `docker volume ls`
   7. 删除卷 `docker volume rm xxx`
2. 绑定安装:

   1. 主机任意目录或文件
   2. -v 后第一字段为主机目录或文件 `-v ./redis/conf:/etc/redis`

3. tmpfs 挂载: 仅存储在主机内存中, 不会写入文件中

## docker-compose

```yml
service:
  redis:
    image: redis:lts
    volumes:
      - myVol:/data
volumes:
  myVol:
  # 外部创建好卷，如下引用
    external: true
```
