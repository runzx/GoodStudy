# centos7 setup
1. sudo yum install epel-release
2. sudo yum install redis v3.2.12

## 
1. https://download.redis.io/releases/redis-6.2.6.tar.gz
2. tar xzf redis-6.2.6.tar.gz && cd redis-6.2.6
3. yum install gcc tcl
4. make MALLOC=libc
5. sudo make install
```sh
cp redis.conf /etc/redis/6379.conf
# 修改配置
daemonize yes
pidfile /var/run/redis_6379.pid
logfile /var/log/redis_6379.log

#  
cp utils/redis_init_script /etc/init.d/redis_6379
# 添加服务
chkconfig --add redis_6379
#  开机自启动
chkconfig --level 2345 redis_6379 on
```

