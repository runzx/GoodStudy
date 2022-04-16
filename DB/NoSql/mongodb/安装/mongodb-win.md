# Run MongoDB Community Edition from the Command Interpreter
0. v5 要 Windows 10 / Windows Server 2016 64bit
1. 管理员 权限 cmd
2. <install directory>\bin\mongod.cfg

```sh
md '/data/db/'

"D:\codeing\tools\DB\Mongodb\mongodb-5.0.7\mongod.exe" --dbpath="D:\codeing\tools\DB\Mongodb\mongodb-5.0.7\db"

# mongod.cfg dbPath 
#  path xxx\bin
```
```yml
# mongod.cfg

#processManagement:
#   fork: true
net:
   bindIp: localhost
   port: 27017
storage:
   dbPath: D:/zx/tools/DB/Mongodb/mongodb-5.0.7/db
systemLog:
   destination: file
   path: "D:/zx/tools/DB/Mongodb/mongodb-5.0.7/log/27017.log"
#   logAppend: true # false 时开启 logRotate name 
   timeStampFormat: iso8601-local
#   verbosity: 5  # default 0
storage:
   journal:
      enabled: true

# https://www.mongodb.com/docs/manual/reference/configuration-options/
```
3. mongod -f mongod.cfg
4. 
##　 Run MongoDB Community Edition as a Windows Service

1. Start MongoDB Community Edition as a Windows Service

2. Stop MongoDB Community Edition as a Windows Service

3. Remove MongoDB Community Edition as a Windows Service
   `sc.exe delete MongoDB`
