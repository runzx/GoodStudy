# mongodb setup

1. docker run --name some-mongo -d mongo:tag
   1. docker run --name mongo3.6 -p 27017:27017 mongo:3.6.23
2. docker stack deploy -c stack.yml mongo
   1. (or docker-compose -f stack.yml up)，
   2. 等待它完全初始化，然后访问 http://localhost:8081

```yml
# stack.yml
# Use root/example as user/password credentials
version: '3.1'

services:
  mongo:
    image: mongo
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: zhaixiang-db
      MONGO_INITDB_ROOT_PASSWORD: 123456

  mongo-express:
    image: mongo-express
    restart: always
    ports:
      - 8081:8081
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: root
      ME_CONFIG_MONGODB_ADMINPASSWORD: 123456
      ME_CONFIG_MONGODB_URL: mongodb://root:example@mongo:27017/
# docker_default   bridge    local
# mongo mongo-express 能解析而成相应ip 172.18.0.2,3
# docker-mongo-1 docker-mongo-express-1 容器名也能解析 
```

3. `docker exec -it mongo3.6 mongo` 进入mongo-cli
4. `--wiredTigerCacheSizeGB 1.5` 限制 cache 尺寸

## 环境变量

0. 您使用已包含数据库的数据目录启动容器，则以下任何变量都不会产生任何影响
1. MONGO_INITDB_DATABASE
   1. 允许您指定用于创建脚本的数据库名称`/docker-entrypoint-initdb.d/*.js`
   2. 首次使用时创建
2. MONGO_INITDB_ROOT_USERNAME,MONGO_INITDB_ROOT_PASSWORD
   1. 一起使用，创建一个新用户并设置该用户的密码。此用户是在 admin 身份验证数据库中创建的，并被赋予角色 root，这是一个“超级用户”角色 ##　初始化一个新实例
3. 容器第一次启动时，它将执行带有扩展名的文件，.sh 这些文件.js 位于`/docker-entrypoint-initdb.d/`. 文件将按字母顺序执行

## data

1. 在主机系统（容器外部）上创建一个数据目录
   1. `docker run -v /my/datadir:/data/db mongo`

## 创建数据库转储

1. `docker exec some-mongo sh -c 'exec mongodump -d <database_name> --archive' > /some/path/on/your/host/all-collections.archive`

```bash
docker run -d --network some-network --name some-mongo \
    -e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
    -e MONGO_INITDB_ROOT_PASSWORD=secret \
    mongo

docker run -it --rm --network some-network mongo \
    mongo --host some-mongo \
        -u mongoadmin \
        -p secret \
        --authenticationDatabase admin \
        some-db
> db.getName();
some-db
```
