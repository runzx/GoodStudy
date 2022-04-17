<!--
 * @Author: zhaix
 * @Date: 2022-04-14 22:59:48
 * @LastEditTime: 2022-04-14 23:13:11
 * @LastEditors: Do not edit
 * @FilePath: \goodstudy\网络技术-平台-框架\windows\windows linux子系统\wsl2\mongodb-setup.md
 * @Description: 
-->
# mongodb 5
1. `wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -`
2. `echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list`
3. `sudo apt-get update`
4. `sudo apt-get install -y mongodb-org`
5. `mongod --version`
6. `mkdir -p ~/data/db` data目录
7. `mongod --dbpath ~/data/db` 实例

## server 服务运行
1. `curl https://raw.githubusercontent.com/mongodb/mongo/master/debian/init.d | sudo tee /etc/init.d/mongodb >/dev/null`
2. `chmod +x /etc/init.d/mongodb`
3. `service mongodb status` start, stop