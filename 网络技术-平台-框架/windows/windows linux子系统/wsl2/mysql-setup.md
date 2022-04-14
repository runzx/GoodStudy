<!--
 * @Author: zhaix
 * @Date: 2022-04-14 22:36:34
 * @LastEditTime: 2022-04-14 23:33:52
 * @LastEditors: Do not edit
 * @FilePath: \goodstudy\网络技术-平台-框架\windows\windows linux子系统\wsl2\mysql-setup.md
 * @Description: ubuntu 下安装mysql
-->
# mysql
1. apt install mysql-server
```sh
Setting up mysql-server-8.0 (8.0.28-0ubuntu0.20.04.4) ...
invoke-rc.d: could not determine current runlevel
 * Stopping MySQL database server mysqld                                                                         [ OK ]
update-alternatives: using /etc/mysql/mysql.cnf to provide /etc/mysql/my.cnf (my.cnf) in auto mode
Renaming removed key_buffer and myisam-recover options (if present)

Created symlink /etc/systemd/system/multi-user.target.wants/mysql.service → /lib/systemd/system/mysql.service.

root@DESKTOP-6S99M96:~# mysql --version
mysql  Ver 8.0.28-0ubuntu0.20.04.4 for Linux on x86_64 ((Ubuntu))
```
2. sudo mysql_secure_installation

## 
1. select Host,User,plugin from mysql.user where User='root';  查看用户状态
2. CREATE USER 'zhaixiang-db'@'%' IDENTIFIED BY 'zx2962';
3. GRANT ALL ON *.* TO 'zhaixiang-db'@'%';
4.  GRANT ALL PRIVILEGES ON *.* TO 'zhaixiang-db'@'%' WITH GRANT OPTION;
5. flush privileges;  #刷新权限信息