# mysql setup

1. https://www.mysql.com/downloads/
   1. 选择 -> MySQL Community (GPL) Downloads »
   2. 选择 -> MySQL Yum Repository
   3. 选择 -> Red Hat Enterprise Linux 7 / Oracle Linux 7 (Architecture Independent), RPM Package，点击 DownLoad
   4. 点击下方 No thanks, just start my download.
2. 查询是否安装了 mysql: `rpm -qa|grep mysql`
   1. 卸载 mysql: `rpm -e --nodeps mysql-libs-5.1.*`
   2. `find / -name mysql ` 删除查询出来的所有东西
3. `yum localinstall mysql80-community-release-el7-3.noarch.rpm`
4. `yum install mysql-community-server` ? `yum install mysql-server`
5. `service mysqld start`
6. 查询 临时密码: `grep 'temporay password' /var/log/mysqld.log`
7. `mysql -uroot -p`
   1. `ALTER USER 'root'@'localhost' IDENTIFIED BY 'zx2962!~Mm';`
   2. `flush privileges;`
   3. `SET GLOBAL validate_password.policy = 0;`
   4. `SET GLOBAL validate_password.length = 6;`
   5. `SHOW VARIABLES LIKE 'validate_password%';`
   6. 用户
      1. CREATE USER 'zhaixiang-db'@'%' IDENTIFIED BY 'zx2962';
      2. GRANT ALL ON *.* TO 'zhaixiang-db'@'%';
      3. 防火墙 
         1. firewall-cmd --state
         2. systemctl disable firewalld.service
         3. firewall-cmd --zone=public --add-port=3306/tcp --permanent
         4. firewall-cmd --reload

8. restore:
   1. mysql -uzhaixiang-db -pzx2962 <braineex.sql
```sh
mysql -uzhaixiang-db -pzx2962 <braineex.sql
mysql -uzhaixiang-db -pzx2962 <nacos_config.sql
mysql -uzhaixiang-db -pzx2962 < pig_ac.sql
mysql -uzhaixiang-db -pzx2962 < pigxx.sql
mysql -uzhaixiang-db -pzx2962 < pigxx_codegen.sql
mysql -uzhaixiang-db -pzx2962 < pigxx_job.sql
mysql -uzhaixiang-db -pzx2962 < pigxx_mp.sql
mysql -uzhaixiang-db -pzx2962 < pigxx_pay.sql
mysql -uzhaixiang-db -pzx2962 < recommend.sql
mysql -uzhaixiang-db -pzx2962 < release.sql

# 上面写入角本，自动执行
chmod +x b.sh
./b.sh
```
