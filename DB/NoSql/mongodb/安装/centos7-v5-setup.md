# centos7 v5 setup
1. https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-red-hat/
2. Configure the package management system

```sh
# vim /etc/yum.repos.d/mongodb-org-5.0.repo 

[mongodb-org-5.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/5.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-5.0.asc

```
3. `sudo yum install -y mongodb-org`
   1. `mongo --version`
4. vim /etc/mongod.conf
   1. bindIp: localhost,  172.18.87.34
5. sudo systemctl start mongod
