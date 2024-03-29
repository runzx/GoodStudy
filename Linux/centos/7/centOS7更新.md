
0. 发行时使用Linux kernel 3.10, systemd 208 (在RHEL 7·2中升级到219),和GNOME 3.8。CentOS 7于2014-07-07发布，完整更新于2020-08-06结束。

1. （7.0-1406：7 July 2014)，目前有些企业已经在使用。它是基于3.2版本内核的，已经不再区分32和64位。
    （7.4-1708：2017-09-13) 3.10.0-693.17.1.el7.x86_64
2. 安装
    磁盘默认是基于LVM的
    建议分区方案：1:/boot 200M;2:/swap:2048M;3:/usr:20G;4:/:20G;5:/data:剩余
        关于SWAP分区大小：8G以下给当前内存的2倍即可，8G以上一律给16G即可（再给大了也是浪费磁盘空间）。
    
    IP设定
        网卡名称不再是eth0、eth1,而是eno+8位数字。
        dhclient先自动获取IP
        默认不再支持ifconfig命令，而是使用ip add查看。
        重启网络命令：systemctl restart network.service
3. 服务
    chkconfig、service等不再被提供，
    取而代之的是systemd（对应的命令是systemctl），使用概况如下：
    systemctl enable httpd.service      #自启动某服务
    systemctl disable httpd.service     #禁用开机启动
    systemctl status httpd.service      #查看服务状态
    systemctl list-units --type=service #查看所有服务
    systemctl start httpd.service
    systemctl stop httpd.service
    systemctl restart httpd.service
    systemctl is-enabled httpd          #查看httpd服务是否开机启动

    启动脚本的存放位置，也不再是/etc/init.d/（这个目录也是存在的），而是
        /usr/lib/systemd/system/.

    防火墙firewalld
        替换为firewalld
            firewalld的规则是动态的，更新了规则不需要重新加载配置。
            在firewalld中有zone和service两个概念。每个zone里面的iptables规则不一样，CentOS 7中预设了9个zone，
                默认的zone是public.

4. 安装
    开启CentOS的网络，不然它跟宿主机都无法直接相连！先进入/etc/sysconfig/network-scripts/ifcfg-ensXX
        最后一行的ONBOOT=no改为ONBOOT=yes
        service network restart重启

        yum update 升级

        node v8+
            curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
            yum install nodejs
        安装nginx 源
            sudo rpm -Uvh http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
            yum install nginx 
            sudo systemctl start nginx.service

            curl -i localhost   //本地测试nginx
            systemctl enable nginx.service  # 自启动 
        查看防火墙：
            systemctl status firewalld.service
                stop, disable, enable 
                查看已启动的服务列表：systemctl list-unit-files|grep enabled
                查看服务是否开机启动：systemctl is-enabled firewalld.service;echo $?
            firewall-cmd --state 查看状态
        Centos7更换阿里云的yum源
            wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
            yum makecache生成缓存
5. 防火墙配置
    firewall-cmd  --list-all    # 查看配置
        public (active)
            target: default
            icmp-block-inversion: no
            interfaces: ens33
            sources:
            services: ssh dhcpv6-client     // ssh默认开放
            ports: 80/tcp
            protocols:
            masquerade: no
            forward-ports:
            source-ports:
            icmp-blocks:
            rich rules:

    firewall-cmd --add-port=80/tcp --permanent  #永久开放80端口
    firewall-cmd --remove-port=9200/tcp --permanent # 禁用此端口
    firewall-cmd --reload  #重新加载

    ss -lpt | grep http # 查看httpd服务
    firewall-cmd --get-services     # 查看防火墙可配置的服务
    firewall-cmd --add-service=http --permanent     # 对外公开http服务
    firewall-cmd  firewall-cmd --remove-service=http --permanent    # 禁用服务
    firewall-cmd --list-services        # 查看已开服务
    firewall-cmd --zone=dmz --list-ports    # 查看区域dmz开打的端口
    firewall-cmd --zone=dmz --add-port=8080/tcp
    firewall-cmd --zone=work --add-service=smtp
    firewall-cmd --zone=work --remove-service=smtp

    默认配置文件有两个：/usr/lib/firewalld/ （系统配置，尽量不要修改）和 /etc/firewalld/ （用户配置地址）
        /etc/firewalld/         目录下才是当前系统生效的各项配置。
        /usr/lib/firewalld/     中是预设的一些配置样例！
    zone概念：
        硬件防火墙默认一般有三个区，firewalld引入这一概念系统默认存在以下区域（根据文档自己理解，如果有误请指正）：
        drop：   默认丢弃所有包
        block：  拒绝所有外部连接，允许内部发起的连接
        public： 指定外部连接可以进入
        external：这个不太明白，功能上和上面相同，允许指定的外部连接
        dmz：    和硬件防火墙一样，受限制的公共连接可以进入
        work：   工作区，概念和workgoup一样，也是指定的外部连接允许
        home：   类似家庭组, 仅接受经过选择的连接
        internal：信任所有连接
        trusted : 信任 ,可以接受所有的网络连接

    firewalld自定义规则
        SSHD端口由默认的修改成1333,
        cp /usr/lib/firewalld/services/ssh.xml /etc/firewalld/services/     #修改某个预设的services端口
        firewall-cmd --add-port=2000-4000/tcp #为当前系统zone添加一段端口范围
        firewall-cmd --permanent --zone=home --add-port=8080/tcp #为特定的zone增加端口
        firewall-cmd --permanent --zone=home --add-forward-port=port=22:proto=tcp:toaddr=127.0.0.2 #启用端口转发，将到22端口的请求转发到127.0.0.2
            
6. 安装mysql 
    https://dev.mysql.com/downloads/repo/yum/
    curl -O https://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm
    yum install -y mysql57-community-release-el7-11.noarch.rpm
    查看mysql server
        yum search mysql-com
    yum -y install mysql-community-server.x86_64    # 安装
    systemctl start mysqld.service      # 启动
    systemctl status mysqld.service

    MySQL5.7.6 之后会在启动 mysql 进程的时候生成一个用户密码，首次登陆需要这个密码才行。密码保存在 mysql 进程的日志里，即
        (/var/log/mysqld.log)
        cat /var/log/mysqld.log | grep 'password'
    mysql -uroot -p    # 登录
    修改密码
        mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'new_password';
    远程访问
        grant all privileges on *.* to 'root'@'%' identified by 'password' with grant option;  
    show variables like 'port'; //查看端口

7. redis
    yum install tcl     // 不用编译了
    yum -y install gcc gcc-c++ zlib-devel openssl openssl-devel pcre-devel kernel keyutils  patch perl
    make MALLOC=libc 
    make install 
    mkdir -p /etc/redis
    ln -s /usr/local/redis/redis.conf /etc/redis/redis.conf
        daemonize yes
        logfile /var/redis/log/redis.log        # 指定log目录文件
        dir /var/redis/data                    # 修改dump目录文件
    /etc/sysctl.conf
        net.core.somaxconn = 2048
        vm.overcommit_memory = 1
            当操作系统收到内存分配请求时，它会依据overcommit_memory 设定的条件，考虑接受或者拒绝这个请求 
                0 – 默认设置 内核使用启发式算法，来估算可用的内存量，直接拒绝不合理的请求 
                1 – 内核不考虑内存是否够用，直接同意请求，在这种设置下，潜在的内存过载风险增加了，但有利于内存密集型任务 
                2 – 如果程序请求的内存分配大于等于 交换分区和物理内存的总和 * overcommit_ratio / 100 则拒绝这个请求 
                默认是 交换分区和物理内存总和的50%
                默认设置是0，只要内存请求超过物理内存的剩余量，请求就会被拒绝。设置1，不管实际物理内存使用量，直接同意请求。设置1是一种比较粗放式的对内存请求的管理方式，
                    我认为更为优雅的方式是使用2，并且将overcommit_ratio 的值设为60 ~ 80
                    echo "vm.overcommit_memory=2" >> /etc/sysctl.conf
                    echo "vm.overcommit_ratio=70" >> /etc/sysctl.conf
    /sbin/sysctl --load=/etc/sysctl.conf    // 立即生效
    cp redis_init_script /etc/init.d/redisd     // d结尾表示服务
        # !/bin/sh
        # chkconfig:   2345 90 10
    #设置为开机自启动服务器
        chkconfig redisd on
    #打开服务
        service redisd start
    
8. v7更新：
    内核更新到3.10.0
    支持Linux容器， 支持Docker技术
    LVM快照支持ext4和XFS
    转用systemd、firewalld和GRUB2
    XFS作为缺省文件系统
    支持PTPv2
    支持40G 以太网卡
    在兼容的硬件上支持以UEFI安全启动模式安装

9. php
    1) php5.6
        配置yum源
            # rpm -Uvh http://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
            # rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-7.rpm
            remi 源默认并没有启用，可以通过修改 repo  文件来启用它。
                vi /etc/yum.repos.d/remi.repo
                    [remi-php56]
                    ......
                    enabled=1
        yum install php php-opcache php-pecl-apcu php-devel php-mbstring php-mcrypt php-mysqlnd php-phpunit-PHPUnit php-pecl-xdebug php-pecl-xhprof php-pdo php-pear php-fpm php-cli php-xml php-bcmath php-process php-gd php-common
        yum install php php-opcache php-pecl-apcu php-devel php-mbstring php-mcrypt php-mysqlnd  php-pdo php-pear php-fpm php-cli php-xml php-bcmath php-process php-gd php-common

            PHP 5.6.33 (cli) (built: Jan  3 2018 13:02:21)
            Copyright (c) 1997-2016 The PHP Group
            Zend Engine v2.6.0, Copyright (c) 1998-2016 Zend Technologies
                with Zend OPcache v7.0.6-dev, Copyright (c) 1999-2016, by Zend Technologies

        配置php.ini
            # vi /etc/php.ini
            理论上配置一下时区就够了：
                date.timezone = Asia/Chongqing
        配置php-fpm
            vi /etc/php-fpm.d/www.conf
            修改以下位置：
                ; 配置php所属用户
                user = nginx
                group = nginx
                
                listen.owner = nginx
                listen.group = nginx
                
                ; 通过sock方式通信
                listen = /var/run/php-fpm/php-fpm.sock
        启动php
            # systemctl start php-fpm
    SELinux 权限设置 错误：   ... FastCGI sent in stderr: "Primary script unknown" while reading response header from upstream, client: 192.168.11.1, server: localhost, request: "GET /phpinfo.php HTTP/1.1", upstream: "fastcgi://127.0.0.1:9000", host: "192.168.11.130"
        ls -alZ
        ls /home/ -alZ      // 查看文件权限
            drwxr-xr-x. root      root      system_u:object_r:home_root_t:s0 .
            dr-xr-xr-x. root      root      system_u:object_r:root_t:s0      ..
            drwxrwxrwx. nginx     nginx     unconfined_u:object_r:home_root_t:s0 www    // 这时导致出错
            drwx------. zhaixiang zhaixiang unconfined_u:object_r:user_home_dir_t:s0 zhaixiang
        chcon -R -t httpd_sys_content_t /home/www
            drwxrwxrwx. nginx     nginx     unconfined_u:object_r:httpd_sys_content_t:s0 www    // OK ！花了我一晚上！！！

        允许apache进程访问mysql
            setsebool -P httpd_can_network_connect=1
    SELinux常用的命令
        ls –Z | ps –Z | id –Z      分别用于查看文件（夹）、进程和用户的SELinx属性。最常用的是ls -Z
        sestatus    查看当前SELinux的运行状态
        setenforce  在SELinux为启动模式下，用此命令可以暂时停用SELinux
        getsebool   查看当前Policy（策略）的布尔值
        setsebool   设置Policy的布尔值，以启用或停用某项Policy
        chcon       改变文件或文件夹的content标记

10. 查看Selinux的状态
    # /usr/sbin/sestatus -v 
    临时关闭
        setenforce 0 
    临时开启
        setenforce 1
    彻底关闭SeLinux请使用下面的命令
        #vim /etc/selinux/config
        将 SELINUX=enforcing 改为 SELINUX=disabled 
        重启服务器即可。
    例：凡是mysql需要访问的地方都加上下面的命令
            chcon -R -t mysqld_db_t /mysqldir   #该命令是修改目录或文件的策略类型为mysql可以访问
        httpd 目录也遇到类似的问题，提示没有权限或找不到文件，但关闭Selinux后正常可以使用下面的命令
            chcon -R -t httpd_sys_content_t /httpddir 