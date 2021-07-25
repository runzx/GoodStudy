# alpine CRON
alpine的crontab实际就是使用BusyBox的crond服务  
1. crond  启动
2. 配置目录 /var/spool/cron/crontabs/
配置文件 /var/spool/cron/crontabs/root  
*       *       *       *       *       echo "test" >> /home/zhaixiang/cron-test.log    // 测试，每分钟输出  
3. 查看状态 ps


4. WSL boot
~~~
wsl sudo配置文件  
sudo visudo
%sudo ALL=NOPASSWD: /etc/init.d/cron start  // 增加

windows 启动目录
shell:startup  