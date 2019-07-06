# 《从0到1实战新零售数据库设计与实现》笔记总结

## 一、课程介绍

### 1.1 学习准备

* 了解MySQL基础知识
* MySQL零基础的同学可以先学习《与MySQL的零距离接触》，<https://www.imooc.com/learn/122> 
* 掌握一种编程语言

### 1.2 最低硬件要求

* 英特尔酷睿i3，或者AMD 200GE
* 内存4GB
* 20GB空闲硬盘空间

### 1.3 搭建VMware虚拟机

* 下载安装VMware虚拟机

  https://www.vmware.com/cn.html

*  下载CentOS镜像文件

  http://mirrors.sohu.com/centos/7/isos/x86_64/CentOS-7-x86_64-Everything-1708.iso

* 配置虚拟机必须要选择桥接网络。如果采用默认的NAT网络模式，未来配置虚拟IP将无效，切记！

* 下载并安装MobaXterm，配置SSH连接

  https://mobaxterm.mobatek.net

### 1.4 Linux基础知识

| 目录 | 用途                             | 重要性 |
| ---- | -------------------------------- | ------ |
| bin  | 存放二进制文件                   | 高     |
| dev  | 存放硬件文件                     | 高     |
| etc  | 存放程序的配置文件               | 高     |
| home | 非root用户的目录文件             | 普通   |
| proc | 存放正在运行中的进程文件         | 高     |
| root | root用户目录                     | 高     |
| sbin | 存放root用户可以执行的二进制文件 | 高     |
| tmp  | 存放系统临时文件                 | 低     |
| usr  | 存放安装的程序                   | 高     |
| var  | 存放程序或者系统日志文件         | 高     |

* 创建文件命令

  ```shell
  touch demo.txt
  ```

* 编辑文件命令

  ```shell
  vi demo.txt
  ```

* 创建文件夹命令

  ```shell
  mkdir school
  ```

* 删除文件或者文件夹命令

  ```shell
  rm -rf demo.txt
  ```

  ```shell
  rm -rf shcool
  ```

* 查看运行中的进程列表

  ```shell
  ps aux
  ```

* 关闭进程

  ```shell
  kill -9 进程编号
  ```

* 关闭SELinux

  * 编辑文件

    ```shell
    vi /etc/selinux/config
    ```

  * 设置 SELINUX=disabled，重启系统



## 二、前置知识

### 2.1 在线安装MySQL数据库

* 替换yum源

  ```shell
  curl -o /etc/yum.repos.d/CentOS-Base.repo mirrors.163.com/.help/CentOS7-Base-163.repo
  ```

  ```shell
  yum clean all 
  yum makecache 
  ```

* 下载rpm文件

  ```shell
  yum localinstall https://repo.mysql.com//mysql80-community-release-el7-1.noarch.rpm
  ```

* 安装MySQL数据库

  ```shell
  yum install mysql-community-server -y
  ```

### 2.2 本地安装MySQL数据库

* 把本课程git工程里共享的MySQL本地安装文件上传到Linux主机的/root/mysql目录

* 执行解压缩

  ```shell
  tar xvf mysql-8.0.11-1.el7.x86_64.rpm-bundle.tar
  ```

* 安装依赖的程序包

  ```shell
  yum install perl -y
  yum install net-tools -y
  ```

* 卸载mariadb程序包

  ```shell
  rpm -qa|grep mariadb
  rpm -e mariadb-libs-5.5.60-1.el7_5.x86_64 --nodeps
  ```

* 安装MySQL程序包

  ```shell
  rpm -ivh mysql-community-common-8.0.11-1.el7.x86_64.rpm 
  rpm -ivh mysql-community-libs-8.0.11-1.el7.x86_64.rpm 
  rpm -ivh mysql-community-client-8.0.11-1.el7.x86_64.rpm 
  rpm -ivh mysql-community-server-8.0.11-1.el7.x86_64.rpm 
  ```

* 修改MySQL目录权限

  ```shell
  chmod -R 777 /var/lib/mysql/
  ```

* 初始化MySQL

  ```shell
  mysqld --initialize
  chmod -R 777 /var/lib/mysql/*
  ```

  

* 启动MySQL

  ```shell
  service mysqld start
  ```

* 查看初始密码

  ```shell
  grep 'temporary password' /var/log/mysqld.log
  ```

* 登陆数据库之后，修改默认密码

  ```mysql
  alter user user() identified by "abc123456"; 
  ```

* 允许远程使用root帐户

  ```mysql
  UPDATE user SET host = '%' WHERE user ='root';
  FLUSH PRIVILEGES;
  ```

* 允许远程访问MySQL数据库（/etc/my.cnf）

  ```ini
  character_set_server = utf8
  bind-address = 0.0.0.0
  ```

* 开启防火墙3360端口

  ```shell
  firewall-cmd --zone=public --add-port=3306/tcp --permanent
  firewall-cmd --reload
  ```



## 三、企业级解决方案

### 3.1 主键用数字还是UUID？

UUID 是通用唯一识别码的缩写，其目的是让分布式系统中的所有元素，都能有唯一的辨识信息，而不需要通过中央控制端来做辨识信息的指定。在数据库集群中，为了避免每个MySQL各自生成的主键产生重复，所以有人考虑采用UUID方式。

#### 使用UUID的好处

* 使用UUID，分布式生成主键，降低了全局节点的压力，使得主键生成速度更快
* 使用UUID生成的主键值全局唯一
* 跨服务器合并数据很方便

#### UUID主键的缺点

* UUID占用16个字节，比4字节的INT类型和8字节的BIGINT类型更加占用存储空间
* UUID是字符串类型，查询速度很慢
* UUID不是顺序增长，作为主键，数据写入IO随机性很大

#### 主键自动增长的优点

* INT和BIGINT类型占用存储空间较小
* MySQL检索数字类型速度远快过字符串
* 主键值是自动增长的，所以IO写入连续性较好

**无论什么场合，都不推荐使用UUID作为数据表的主键，而是要利用数据库中间件来生成全局主键**

### 3.2 订单号和流水号的关系

* 订单号既是订单的唯一编号，而且经常被用来检索，所以应当是数字类型的主键
* 流水号是打印在购物单据上的字符串，便于阅读，但是不用做查询

### 3.3 在线修改表结构

在业务系统运行的过程中随意删改字段，会造成重大事故。常规的做法是业务停机，维护表结构，但是不影响正常业务的表结构是允许在线修改的。

【ALTER TABLE 修改表结构的弊病】

* 由于修改表结构是表级锁，因此在修改表结构时，影响表写入操作
* 如果修改表结构失败，必须还原表结构，所以耗时更长
* 大数据表记录多，修改表结构锁表时间很久

【使用Percona-Toolkit工具】

* 安装第三方依赖包

  ```shell
  yum install  -y perl-DBI
  yum install  -y perl-DBD-mysql
  yum install  -y perl-IO-Socket-SSL
  yum install  -y perl-Digest-MD5
  yum install  -y perl-TermReadKey
  ```

* 安装Percona-Toolkit

  ```shell
  #进入到Percona-Tookit离线文件所在的目录
  rpm -ivh *.rpm
  ```

* 把客户收货地址表中的name字段改成VARCHAR(20)

  ```shell
  pt-online-schema-change --host=192.168.99.202 --port=3306 --user=root --password=abc123456 --alter "MODIFY name VARCHAR(20) NOT NULL COMMENT '收货人'" D=neti, t=t_customer_address --print --execute
  ```

### 3.4 架设本地图床服务器

* 设置Nginx安装源

  ```shell
  rpm -ivh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
  ```

  ```shell
  yum install -y nginx
  ```

* 防火墙开放80端口

  ```shell
  firewall-cmd --zone=public --add-port=80/tcp --permanent
  firewall-cmd --reload
  ```

* 在/usr/share/nginx/html目录下创建文件夹，上传图片即可

### 3.5 读多写少和写多读少

#### 读多写少的解决方案

可以把MySQL组建集群，并且设置上读写分离

#### 写多读少的解决方案

如果是低价值的数据，可以采用NoSQL数据库来存储这些数据

如果是高价值的数据，可以用TokuDB来保存

### 3.6 逻辑删除还是物理删除？

物理删除就是用DELETE、TRUNCATE、DROP语句删除数据。物理删除是把数据从硬盘中删除，可以释放存储空间，缩小数据表的体积，对性能提升有帮助

物理删除会造成主键的不连续，导致分页查询变慢

```mysql
SELECT ……  FROM ……  LIMIT 1000, 20;
```

```mysql
SELECT ……  FROM ……  WHERE  id>=1000  AND  id<= 1020;
```

核心业务表的数据不建议做物理删除，只做状态变更。比如订单作废、账号禁用、优惠券作废等等。既不删除数据，又能缩小数据表体积，可以把记录转移到历史表。

逻辑删除就是在数据表添加一个字段（is_deleted），用字段值标记该数据已经逻辑删除，查询的时候跳过这些数据

### 3.7 海量记录快速分页

利用主键索引来加速分页查询

```mysql
SELECT * FROM t_test WHERE id>=5000000 LIMIT 100;
SELECT * FROM t_test WHERE id>=5000000 AND id<=5000000+100;
```

如果用物理删除，主键不连续，就不能用主键索引来加速分页，所以只能使用折中的方案

```mysql
SELECT t.id, t.name FROM t_test t JOIN ( SELECT id FROM t_test LIMIT 5000000, 100) tmp ON t.id = tmp.id;
```

### 3.8 乐观锁

在并发环境下，如果多个客户端访问同一条数据，此时就会产生数据不一致的问题，如何解决，通过加锁的机制，常见的有两种锁，乐观锁和悲观锁，可以在一定程度上解决并发访问。

乐观锁，顾名思义，对加锁持有一种乐观的态度，即先进行业务操作，不到最后一步不进行加锁，"乐观"的认为加锁一定会成功的，在最后一步更新数据的时候在进行加锁，乐观锁的实现方式一般为每一条数据加一个版本号，更新数据的时候，比较版本号，系统就知道有没有出现数据的并发更新。如果小于等于当前版本号的更新，都会被放弃。

### 3.9 为什么要放弃存储过程、触发器和自定义函数？

因为在数据库集群的场景里，由于存储过程、触发器和自定义函数都是在本地数据库节点上运行，它们与数据库集群业务产生了冲突，所以为了顾全大局，放弃使用数据库本地编程，甚至连数据库本地生成主键的机制也都放弃了。

### 3.10 如何避免偷换交易中的商品信息？

B2B电商平台，通常采用保存历次商品修改信息、降低搜索排名

B2C电商平台，只需要保存历次商品修改信息即可

### 3.11 如何抵御XSS攻击？

XSS攻击，是通过在网页上嵌入恶意的JavaScript代码，然后当浏览器渲染DOM组件的时候，这段恶意的脚本就执行了，然后盗取个人账号信息。

第一种，大家都已经知道了，那就是在网页里面植入恶意代码即可。植入过的过程就是你到网站上发帖与回帖。别人看到这个网页，他的账号就被你窃取到了。为什么说XSS攻击跟数据库有关系呢？毕竟发帖回帖的内容，是保存到数据库上的。如果我们对保存到MySQL的数据，先做一下转义，那么将来输出到页面上，那么浏览器就不会当它是标签了，因此也就不会执行恶意代码。

第二种XSS攻击的常用方式，就是发送HTML格式的邮件。因为邮件本身就是一个HTML页面，所以往里面挂恶意代码非常容易。当用户在浏览器上登陆网易邮箱，然后点开这个邮件，那么恶意脚本就开始执行，马上就窃取到你的账户信息。抵御这种XSS攻击，就只能靠电子信箱的运营商，加强邮件内容的过滤，筛选出恶意的脚本。

### 3.12 数据库缓存（查询缓存）、程序缓存应该选择哪个？

MySQL的查询缓存结构的是KV的，数据库会把执行过的SELECT结果集缓存到内存里面，KEY是SQL语句，VALUE是结果集。

查询缓存最大的缺点就是，只要用户对数据表修改一条记录，就会让这个数据表的缓存大面积的失效，这就造成的IO压力突然增大，所以最好的办法就是不使用查询缓存，而改用数据缓存，数据缓存是把InnoDB数据表和索引中的一部分记录缓存到内存中。用户更新数据的时候，更新了数据表多少条记录，响应个缓存就更改多少条，并不会出现缓存大面积失效的情况。

数据库的查询缓存因为不可以细颗粒度的设置哪张数据表结果集被缓存，但是程序查询缓存可以详细设置哪一条的SQL的结果集被缓存。所以我们可以避开内容经常变化的数据表，对哪些数据不经常变化的数据表设置查询缓存。

SpringCache技术是Java领域里面比较成熟的缓存方案，使用注解就能管理缓存。结合Redis，可以充分发挥查询缓存的优势。

### 3.13 新零售系统的智能拆分订单

具体操作，详见视频教程

### 3.14 中文分词技术

具体操作，详见视频教程

## 四、新零售系统数据库性能优化进阶

### 4.1 MySQL压力测试

压力测试是针对系统的一种性能测试，但是测试数据与业务逻辑无关，更加简单直接的测试读写性能。

压力测试有4个重要测试指标：TPS、QPS、响应时间和并发量

* QPS是每秒钟处理完的请求数量
* TPS是每秒钟处理完的事物数量
* 响应时间是一次请求的平均处理时间
* 并发量是系统能同时处理的请求数量

安装sysbench工具

```shell
curl -s https://packagecloud.io/install/repositories/akopytov/sysbench/script.rpm.sh | sudo bash 
```

```shell
yum -y install sysbench
```

准备测试数据

```shell
sysbench /usr/share/sysbench/tests/include/oltp_legacy/oltp.lua --mysql-host=192.168.99.202 --mysql-port=3306 --mysql-user=root --mysql-password=abc123456 --oltp-tables-count=10 --oltp-table-size=100000 prepare
```

执行测试

```shell
sysbench /usr/share/sysbench/tests/include/oltp_legacy/oltp.lua --mysql-host=192.168.99.202 --mysql-port=3306 --mysql-user=root --mysql-password=abc123456 --oltp-test-mode=complex --threads=10 --time=300 --report-interval=10 run >> /home/mysysbench.log
```

### 4.2 SQL语句优化

* 不要把SELECT子句写成 SELECT *

  ```mysql
  SELECT * FROM t_emp;
  ```

* 谨慎使用模糊查询

  ```mysql
  SELECT ename FROM t_emp WHERE ename LIKE '%S%'; #不使用索引
  SELECT ename FROM t_emp WHERE ename LIKE 'S%';
  ```

* 对ORDER BY排序的字段设置索引

* 少用IS NULL

  ```mysql
  SELECT ename FROM t_emp WHERE comm IS NULL; #不使用索引
  SELECT ename FROM t_emp WHERE comm =-1;
  ```

* 尽量少用 != 运算符

  ```mysql
  SELECT ename FROM t_emp WHERE deptno!=20; #不使用索引
  SELECT ename FROM t_emp WHERE deptno<20 AND deptno>20;
  ```

* 尽量少用 OR 运算符

  ```mysql
  SELECT ename FROM t_emp WHERE deptno=20 OR deptno=30; #不使用索引
  SELECT ename FROM t_emp WHERE deptno=20 
  UNION ALL
  SELECT ename FROM t_emp WHERE deptno=30;
  ```

* 尽量少用 IN 和 NOT IN 运算符

  ```mysql
  SELECT ename FROM t_emp WHERE deptno IN (20,30); #不使用索引
  SELECT ename FROM t_emp WHERE deptno=20 
  UNION ALL
  SELECT ename FROM t_emp WHERE deptno=30;
  ```

* 避免条件语句中的数据类型转换

  ```mysql
  SELECT ename FROM t_emp WHERE deptno='20';
  ```

* 在表达式左侧使用运算符和函数都会让索引失效

  ```mysql
  SELECT ename FROM t_emp WHERE salary*12>=100000; #不使用索引
  SELECT ename FROM t_emp WHERE salary>=100000/12;
  SELECT ename FROM t_emp WHERE year(hiredate)>=2000; #不使用索引
  SELECT ename FROM t_emp 
  WHERE hiredate>='2000-01-01 00:00:00';
  ```

### 4.3 MySQL参数优化

* 最大连接数
  * max_connections是MySQL最大并发连接数，默认值151
  * MySQL允许的最大连接数上限是16384
  * 实际连接数是最大连接数的85%较为合适
* 请求堆栈的大小
  * back_log是存放执行请求的堆栈大小，默认值是50
  * 一般堆栈大小设置成最大连接数的1/3
* 修改并发线程数
  * innodb_thread_concurrency代表并发线程数，默认是0
  * 并发线程数应该设置为CPU核心数的两倍
* 修改连接超时时间
  * wait-timeout是超时时间，单位是秒
  * 连接默认超时为8小时，连接长期不用又不销毁，浪费资源
* 数据缓存
  * innodb_buffer_pool_size是InnoDB的缓存容量，默认是128M
  * InnoDB缓存的大小可以设置为主机内存的70%~80%

### 4.4 慢查询日志

慢查询日志会把查询耗时超过规定时间的SQL语句记录下来，利用慢查询日志，定位分析性能的瓶颈。

slow_query_log 可以设置慢查询日志的开闭状态

long_query_time 可以规定查询超时的时间，单位是秒

```ini
slow_query_log = ON
long_query_time = 1
```



## 五、数据库集群

### 5.1 **数据库集群能解决什么问题？**

如果在低并发的情况下，单节点MySQL的读写速度更快。因为在数据库集群中，多个MySQL节点的数据要通过网络同步，所以读写速度不如单节点MySQL

但是在高并发的情况下，大量的读写请求会让单节点MySQL的硬盘无法承受，所以速度会变得很慢。比如说12306最开始上线的时候，大量用户涌入网站购票，结果系统就崩溃了。

高并发恰恰是数据库集群的主场。大量的读写请求会被分散发往多个节点执行。众人拾柴火焰高，多个MySQL执行读写请求，肯定比单节点MySQL快，所以在高负载的情况下，单节点MySQL接近崩溃，反而数据库集群的读写速度更快。

### 5.2 如何使用Docker虚拟机

#### 5.2.1 Docker镜像

Docker的镜像文件，相当于是一个只读层，不能往里面写入数据。我们可以通过编写dockerfile文件，定义需要安装的程序，比如说MySQL、Redis、JDK、Node.js等等，然后执行这个dockerfile文件，创建出镜像文件。

手写dockerfile还是比较麻烦的，所以我们可以在Docker的镜像仓库里面寻找别人已经创建好的镜像，比如说你想部署Java程序，那么就在线下载Java镜像即可，非常简单。

毕竟Docker镜像是只读层，如果我们想要往里面部署层序应该怎么办呢？这个很简单，我们可以给镜像创建一个容器，容器是可读可写的，我们把程序部署在容器里就行了。

#### 5.2.2 Docker容器

我们说的在Docker虚拟机中创建实例，指的就是容器。因为镜像的内容是只读的，想要部署程序，我们需要创建出容器实例，容器的内容是可以读写的，可以用来部署程序。

而且容器之间是完全隔离的，我们不用担心一个容器中部署程序，会影响到另一个容器。就比如说我们在CentOS上直接安装MySQL 8.0，它跟Percona Toolkit有冲突，跟Sysbench也有冲突，所以我们做在线修改表结构，以及做压力测试的时候，都是挑选新的虚拟机实例来安装这些程序，访问MySQL的。如果用上了Docker，我可以在A容器里安装MySQL，在B容器跑压力测试，根本不会有冲突。

再有，必须先有镜像，才能创建出容器，镜像和容器之间是关联的关系。而且一个镜像可以创建出多个容器，像是SaaS云计算，运营商可以把进销存系统打成镜像。有企业购买进销存系统，那么运营商就给客户创建一个容器，客户的进销存数据保存在容器A里面。再有客户购买进销存系统，运营商就创建容器B，以此类推。云计算服务商就是这么卖软件的。

#### 5.2.3 安装Docker虚拟机

```shell
yum install -y docker
```

```shell
service docker start
```

```shell
service docker stop
```

#### 5.2.4 操作Docker虚拟机

![](笔记图片\1.png)

##### 设置镜像加速器

```shell
curl -sSL https://get.daocloud.io/daotools/set_mirror.sh | sh -s http://f1361db2.m.daocloud.io
```

编辑/etc/docker/daemon.json文件，把结尾的逗号去掉

#### 管理镜像

```shell
#搜索镜像
docker search 关键字
#下载镜像
docker pull 镜像名字
#查看镜像
docker images
#重命名镜像
docker tag 旧镜像 新镜像
#删除镜像
docker rmi 镜像名字
#导出镜像
docker save -o 压缩文件路径 镜像名字
#导入镜像
docker load < 压缩文件路径
```

#### 创建容器

```shell
#创建普通容器
docker run -it --name 别名 镜像名字 程序名字
#创建含有端口映射的容器
docker run -it --name 别名 -p 宿主机端口:容器端口 镜像名字 程序名字
#创建含有挂载目录的容器
docker run -it --name 别名 -v 宿主机目录:容器目录 --privileged 镜像名字 程序名字
```

#### 操作容器状态

```shell
#暂停容器
docker pasue 容器
#恢复容器
docker unpause 容器
#停止容器
docker stop 容器
#启动容器
docker start -i 容器
```

#### 创建Swarm集群

因为我们要利用Docker环境搭建数据库集群，如果把所有的MySQL节点都部署在同一个Docker虚拟机之内，要是宿主机宕机，那么Docker里面所有的容器都不能使用了，数据库集群就彻底瘫痪了。所以我们应该采用分布式部署的方案，把MySQL节点部署在不同的Docker虚拟机之上。不光是数据库集群要采用分布式部署，像什么Java程序、PHP程序也都要采用分布式部署。

![](笔记图片\2.png)

```shell
#创建Swarm集群（该节点自动变成管理节点）
docker swarm init
#查看Swarm集群中的Docker节点（管理节点上执行）
docker node ls
#删除Swarm集群的Docker节点（管理节点上执行）
docker noode rm 节点ID -f
#退出Swarm集群（Workd节点上执行）
docker swarm leave
#退出Swarm集群（管理节点上执行）
docker swarm leave -f
```

```shell
#查看虚拟网络
docker network ls
#创建虚拟网络
docker network create -d overlay --attachable 虚拟网络名称
#删除虚拟网络（先删除该网络上部署的容器）
docker network rm 虚拟网络名称
```
