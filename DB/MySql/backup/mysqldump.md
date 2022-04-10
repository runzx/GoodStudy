# mysql备份与还原
1. mysqldump -h主机名  -P端口 -u用户名 -p密码 –database 数据库名 > 文件名.sql 
2. 将MySQL数据库压缩备份
   1. `mysqldump -hhostname -uusername -ppassword -database databasename | gzip > backupfile.sql.gz`
3. 备份MySQL数据库某个(些)表
   1. `mysqldump -hhostname -uusername -ppassword databasename specific_table1 specific_table2 > backupfile.sql`
4. 备份服务器上所有数据库
   1. `mysqldump –all-databases > allbackupfile.sql`

## restore
1. `mysql -hhostname -uusername -ppassword databasename < backupfile.sql`
2. `gunzip < backupfile.sql.gz | mysql -uusername -ppassword databasename`
3. 导入数据库
   1. use 进入到某个数据库
   2. mysql> source d:\test.sql; 后面的参数为脚本文件