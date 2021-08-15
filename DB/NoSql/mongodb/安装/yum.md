# yum

1. vi /etc/yum.repos.d/mongodb-org.repo

```
[mongodb-org]
name = MongoDB Repository
baseurl = https://mirrors.aliyun.com/mongodb/yum/redhat/$releasever/mongodb-org/3.6/x86_64/
gpgcheck = 1
enabled = 1
gpgkey = https://www.mongodb.org/static/pgp/server-3.6.asc

[mongodb-org-4.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.4.asc


[mongodb-org-5.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/5.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-5.0.asc

[mongodb-org-5.0-ali]
name=MongoDB Repository
baseurl=https://mirrors.aliyun.com/mongodb/yum/redhat/$releasever/mongodb-org/5.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-5.0.asc
```

2. sudo yum install -y mongodb-org
3. 或 `sudo yum install -y mongodb-org-5.0.2 mongodb-org-database-5.0.2 mongodb-org-server-5.0.2 mongodb-org-shell-5.0.2 mongodb-org-mongos-5.0.2 mongodb-org-tools-5.0.2 `
4. sudo systemctl start mongod
5. sudo systemctl enable mongod
6. Default Directories

- /etc/mongod.conf
  - storage.dbPath t
  - systemLog.path
- /var/lib/mongo (the data directory)
- /var/log/mongodb (the log directory)

7. `sudo chown -R mongod:mongod <directory>`
