# setup tools

1. /etc/yum.repos.d/mongodb.repo

```conf
[mongodb-org-5.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/5.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-5.0.asc

# ali mirrors
baseurl = https://mirrors.aliyun.com/mongodb/yum/redhat/$releasever/mongodb-org/3.6/x86_64/
# ckiyd.tencent.com
baseurl=http://mirrors.cloud.tencent.com/mongodb/yum/el$releasever/
```

2. `sudo yum install -y mongodb-org-5.0.9 mongodb-org-database-5.0.9 mongodb-org-server-5.0.9 mongodb-org-shell-5.0.9 mongodb-org-mongos-5.0.9 mongodb-org-tools-5.0.9`
   1. sudo yum install -y mongodb-org
3. `mongorestore -h localhost:27017 -d release release-2022_07_05_05/release -u root -p zx2962 --authenticationDatabase admin`
