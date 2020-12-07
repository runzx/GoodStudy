## wsl setup
`nano /etc/apk/repositories`  源  

http://dl-cdn.alpinelinux.org/alpine/v3.12/main  
http://dl-cdn.alpinelinux.org/alpine/v3.12/community  

http://mirrors.aliyun.com/alpine/v3.12/main  
http://mirrors.aliyun.com/alpine/v3.12/community  


http://mirrors.aliyun.com/alpine/v3.9/main  
http://mirrors.aliyun.com/alpine/v3.9/community  

v3.9 为mongodb  
apk add yaml-cpp=0.6.2-r2 // 必须将版本固定到0.6.2- 否则mongo将导致动态链接失败。  

http://dl-cdn.alpinelinux.org/alpine/v3.12/edge
nodejs v12.18  最新版  

# 安装数据库及客户端
$ apk add mysql mysql-client

# 初始化数据库
$ mysql_install_db --user=mysql --datadir=/var/lib/mysql

chown mysql:mysql -R /var/log/mysql  
配置文件 /etc/mysql/my.cnf  
log-error = /var/log/mysql/error.log  
datadir = /data/mysql/data  
# 启动服务
$ rc-service mariadb start  # 若没有rc，安装：apk add openrc

# 修改密码
$ mysqladmin -u root password '新root密码'

# 加入开机启动
$ rc-update add mariadb default

Version: '10.5.6-MariaDB'  socket: '/run/mysqld/mysqld.sock'  port: 3306  MariaDB Server