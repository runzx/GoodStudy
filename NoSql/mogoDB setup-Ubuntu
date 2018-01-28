

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#install-mongodb-community-edition

1. Import the public key used by the package management system.

    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5

        Executing: /tmp/tmp.kjqALlSWot/gpg.1.sh --keyserver
        hkp://keyserver.ubuntu.com:80
        --recv
        2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5
        gpg: requesting key 91FA4AD5 from hkp server keyserver.ubuntu.com
        gpg: key 91FA4AD5: public key "MongoDB 3.6 Release Signing Key <packaging@mongodb.com>" imported
        gpg: Total number processed: 1
        gpg:               imported: 1  (RSA: 1)

2. Create a list file for MongoDB.(ubuntu16.0.4)
    echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list
国内镜像ali
    echo "deb [ arch=amd64,arm64 ]  http://mirrors.aliyun.com/mongodb/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list

3. Reload local package database.
    sudo apt-get update
4. Install the MongoDB packages.
    //  latest stable versio
    sudo apt-get install -y mongodb-org

5. 
    data files in   /var/lib/mongodb 
    log files in    /var/log/mongodb
    /etc/mongod.conf

6.
    Start MongoDB.
        sudo service mongodb start
        sudo service mongodb restart
    use
        mongo --host 127.0.0.1:27017

7. Ubuntu 16.04解决办法
    如果你在使用Ubuntu 16.04，可能会看到这个问题：由于从upstart改用systemd，
        出现错误mongodb: unrecognized service。
    1.如果你添加了/etc/apt/sources.list.d/mongodb-org.list，用命令sudo rm /etc/apt/sources.list.d/mongodb-org.list移除它。
    2. 使用命令sudo apt-get update，更新apt。
    3. 使用命令sudo apt-get install mongodb，安装来自标准软件库的正式MongoDB版本，以便让服务正确安装。

    4. 重新改回新的源，再安装就ok
        sudo service mongodb start //不能用mongod !