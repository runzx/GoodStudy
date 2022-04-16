# windows setup (zip包安装)
1. MySQL 8.0 Server requires the Microsoft Visual C++ 2019 Redistributable Package
2. creat my.ini (my.cnf)
3. `mysqld --initialize --console` 随机密码在log里， (--initialize-insecure root密码为空) 初始化数据库
4. `mysqld --console` 命令行启动
5. `mysqladmin -u root shutdown` stop mysql
```sh
[mysqld]
#sql_mode=NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES
# 设置3306端口
#port=3306

# mysql的安装目录
# windows用双斜杠 \\ 或 /
basedir=D:/codeing/tools/DB/mysql/mysql-8.0.28
#basedir=D:\\codeing\\tools\\DB\\mysql\\mysql-8.0.28

# 有basedir,系统会自己 在data/下建数据库
# datadir=D:\\codeing\\tools\\DB\\mysql\\mysql-8.0.28
```
## 作为服务 启动 
1. `mysqld --install xxx`  安装为服务xxx 默认名 MySQL
   1. 手动启动服务 `--install-manual--install`
   2. `--defaults-file=C:\my-opts.cnf` 指定配置文件
   3. 错误 Install/Remove of the Service Denied!， 要用管理员身份

2. 手动启动
   1. `sc start MySQL`  或 `net start MySQL`
   2. stop `sc stop MySQL` 
   3. delete `sc delete MySQL` | `mysqld --remove`

