# mongoDB windows setup
```
    要注意！！！ 取消选项：install MongoDB Compass 
    不然会要很长时间！！
Component Set	Binaries
Server	mongod.exe
Router	mongos.exe
Client	mongo.exe
MonitoringTools	mongostat.exe, mongotop.exe
ImportExportTools	mongodump.exe, mongorestore.exe, mongoexport.exe, mongoimport.exe
MiscellaneousTools	bsondump.exe, mongofiles.exe, mongooplog.exe, mongoperf.exe
```
2. 运行
    1. 认定环境，指定数据库路径，log
        "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath d:\test\mongodb\data
        "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --dbpath "d:\test\mongo db data"

        mongod --config /etc/mongod.conf
        路径可放在配置文件里
        （yaml格式：
            大小写敏感
            使用缩进表示层级关系
            缩进时不允许使用Tab键，只允许使用空格。
            缩进的空格数目不重要，只要相同层级的元素左侧对齐即可
        ）
        C:\Program Files\MongoDB\Server\3.4\mongod.cfg :
            systemLog:
                destination: file
                path: c:\data\log\mongod.log
            storage:
                dbPath: c:\data\db
    2. 启动服务
        "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe"
    3. windows下安装, 在管理员终端下：     https://docs.mongodb.com/manual/tutorial/install-mongodb-enterprise-on-windows/
        "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --config "C:\Program Files\MongoDB\Server\3.4\mongod.cfg" --install
        net start MongoDB       //启动
        net stop MongoDB        //停止
        "C:\Program Files\MongoDB\Server\3.4\bin\mongod.exe" --remove       //To remove the MongoDB service 
    4. php 安装
        php.ini
            [mongodb]
            extension="C:\phpStudy\php\php-5.6.27-nts\ext\php_mongodb.dll"

        PECL提供的mongo扩展是PHP 5.x的旧版驱动程序。该mongo扩展不再保持，
        新的项目建议使用mongodb扩展和PHP库。社区开发的Mongo PHP适配器项目mongo使用新的mongodb扩展和PHP库来实现旧 扩展的API ，
    5. TP5 安装
        composer.bat require topthink/think-mongo
            Using version ^2.0 for topthink/think-mongo
            ./composer.json has been updated
            Loading composer repositories with package information
            Updating dependencies (including require-dev)
            Package operations: 3 installs, 0 updates, 0 removals
            - Installing topthink/think-installer (v1.0.12): Downloading (100%)
            - Installing topthink/framework (v5.0.9): Downloading (100%)
            - Installing topthink/think-mongo (v2.0): Downloading (100%)
            Writing lock file
            Generating autoload files
        在项目/vendor/下生成2目录：
            composer/
            topthink/
                think-installer/
                think-mongo/
        MongoDb默认的主键是_id并且是一个ObjectID对象，如果需要和mysql一样使用id作为主键，可以如下参数：
            // 强制把_id转换为id 
            'pk_convert_id' => true,
    6. PHPstorm 
        安装插件： mongo plugin

