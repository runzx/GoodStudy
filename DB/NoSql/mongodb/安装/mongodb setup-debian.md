1. `wget -qO - https://www.mongodb.org/static/pgp/server-3.6.asc | sudo apt-key add -`  

2. `echo "deb http://repo.mongodb.org/apt/debian stretch/mongodb-org/3.6 main" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list`  
3. `sudo apt-get update`  
4. `sudo apt-get install -y mongodb-org`  mongodb-org (3.6.17)  

By default, MongoDB instance stores:  
its data files in /var/lib/mongodb  
its log files in /var/log/mongodb  

5. `systemctl start mongod`  
`systemctl enable mongod`  


