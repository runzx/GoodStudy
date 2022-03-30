# mysql setup
1. https://www.mysql.com/downloads/
   1. 选择 ->  MySQL Community (GPL) Downloads »
   2. 选择 ->  MySQL Yum Repository
   3. 选择 ->  Red Hat Enterprise Linux 7 / Oracle Linux 7 (Architecture Independent), RPM Package，点击DownLoad
   4. 点击下方No thanks, just start my download.
2. 查询是否安装了mysql: `rpm -qa|grep mysql`
   1. 卸载mysql: `rpm -e --nodeps mysql-libs-5.1.*` 
   2. `find / -name mysql ` 删除查询出来的所有东西
3. `yum localinstall mysql80-community-release-el7-3.noarch.rpm`
4. `yum install mysql-community-server` ? `yum install mysql-server`
5. `service mysqld start`
6. 查询 临时密码: `grep 'temporay password' /var/log/mysqld.log`
7. `mysql -uroot -p`
   1. `ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass4!';`