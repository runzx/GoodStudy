## LNMP - Docker 多容器间协作互连

1. https://hub.docker.com/r/twang2218/lnmp-nginx/

```Dockerfile
# twang2218/lnmp-nginx
# Dockerfile :
FROM nginx:latest
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./site /var/www/site

# twang2218/lnmp-php
# Dockerfile :
FROM php:7-fpm
RUN apt-get update \
    && apt-get upgrade -y \
    && apt-get install -y \
        build-essential \
        php5-dev \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libmcrypt-dev \
        libpng12-dev \
    && docker-php-ext-install iconv mcrypt mysqli pdo pdo_mysql zip \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install gd \
    && rm -rf /var/cache/apt/*
COPY ./php.conf /usr/local/etc/php/conf.d/php.conf
COPY ./site /var/www/site
```

1. 服务
   1. 在 docker-compose.yml 文件中, 定义了 3 个服务
   2. nginx, php 和 mysql。

```yml
# docker-compose.yml
services:
    nginx:
        image: "${DOCKER_USER}/lnmp-nginx:v1.0"
        # ${DOCKER_USER} 这种用法是环境变量替换
        # Docker Compose 默认的环境变量文件 .env 文件

        # 如镜像不存在,下方指定的 build 指令进行构建
        # 在 Swarm 环境中, 需要集群中全体主机使用同一个镜像, 每个机器自己构建就不合适了
        build:
            context: ./web
            dockerfile: Dockerfile.nginx
        ...
    php:
        image: "${DOCKER_USER}/lnmp-nginx:v1.0"
        build:
            context: ./web
            dockerfile: Dockerfile.php
        ...
    mysql:
        image: mysql:5.7
        ...
```

2. 镜像

```yml
# mysql 服务镜像

mysql:
    image: mysql:5.7
    ...
    environment:
        TZ: 'Asia/Shanghai'
        MYSQL_ROOT_PASSWORD: Passw0rd # 初始密码

    # 启动容器的命令 指定了默认字符集
    command: ['mysqld', '--character-set-server=utf8']
    ...
```

```Dockerfile
# nginx 服务镜像
FROM nginx:1.11
ENV TZ=Asia/Shanghai
# 需要添加默认网站的配置文件、以及网站页面目录。
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY ./site /usr/share/nginx/html

# php 服务镜像
FROM php:7-fpm

ENV TZ=Asia/Shanghai

COPY sources.list /etc/apt/sources.list
#  将同一类的东西写入一层, 并且在结束时清理任何无关的文件
RUN set -xe \
    && echo "构建依赖" \
    && buildDeps=" \
        build-essential \
        php5-dev \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libmcrypt-dev \
        libpng12-dev \
    " \
    && echo "运行依赖" \
    && runtimeDeps=" \
        libfreetype6 \
        libjpeg62-turbo \
        libmcrypt4 \
        libpng12-0 \
    " \
    && echo "安装 php 以及编译构建组件所需包" \
    && apt-get update \
    && apt-get install -y ${runtimeDeps} ${buildDeps} --no-install-recommends \
    && echo "编译安装 php 组件" \
    # 为了帮助镜像定制所提供
    && docker-php-ext-install iconv mcrypt mysqli pdo pdo_mysql zip \
    && docker-php-ext-configure gd \
        --with-freetype-dir=/usr/include/ \
        --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install gd \
    && echo "清理" \
    && apt-get purge -y --auto-remove \
        -o APT::AutoRemove::RecommendsImportant=false \
        -o APT::AutoRemove::SuggestsImportant=false \
        $buildDeps \
    && rm -rf /var/cache/apt/* \
    && rm -rf /var/lib/apt/lists/*
    # 安装后, 可以把不再需要的“构建依赖”删除掉,
COPY ./php.conf /usr/local/etc/php/conf.d/php.conf
COPY ./site /usr/share/nginx/html
```

3. 网络

```yml


services:
    nginx:
        ...
        networks:
            - frontend
    php:
        ...
        networks:
            - frontend
            - backend
    mysql:
        ...
        networks:
            - backend

# 处于同一网络的容器, 可以使用服务名访问对方
networks:
    frontend:
    backend:
    # frontend、backend 后面是空的, 这是指一切都使用默认

# https://docs.docker.com/engine/userguide/networking/dockernetworks/#/user-defined-networks
# https://docs.docker.com/compose/networking/
```

4. 存储
   1. nginx 和 php 都是无状态服务,
   2. volumes:

```yml
mysql:
  image: mysql:5.7

  # 命名卷 mysql-data, 挂载到容器的 /var/lib/mysql
  volumes: - mysql-data:/var/lib/mysql
  ...
```

5. 依赖
   1. 服务的启动顺序有时候比较关键, Compose 在这里可以提供一定程度的启动控制。
   2. `docker-compose up -d` 的时候, 会根据依赖控制服务间的启动顺序

```yml
services:
  nginx:
    ...
    depends_on: - php
  php:
    ...
    depends_on: - mysql
  mysql:
    ...
# mysql → php → nginx 的顺序启动服务
# 确定容器启动后, 则开始启动下一个服务

# 应用级别的服务依赖等待, 需要在 entrypoint.sh 这类脚本中, 加入服务等待的部分
# 通过 `restart:always` 这种设置, 让应用启动过程中, 如果依赖服务为准备好, 而报错退出后, 有再一次尝试的机会
```

6. 操作
1. 启动 `docker-compose up -d`
   1. -f, --file FILE 指定使用的 Compose 模板文件，默认为 docker-compose.yml，可以多次指定
   2. --verbose 输出更多调试信息
2. 如果修改了配置文件, 可能需要明确重新构建, `docker-compose build`
   1. --force-rm 删除构建过程中的临时容器
   2. --no-cache 构建镜像过程中不使用 cache
3. 查看服务状态 `docker-compose ps`
4. 查看服务日志 `docker-compose logs`
5. 访问服务
6. 停止服务 `docker-compose down`
7. 验证 Compose 文件格式 `docker-compose config`
8. 查看服务容器的输出 `docker-compose logs [options] [SERVICE...]` 不同的颜色来区分
9. v2版 docker compose 