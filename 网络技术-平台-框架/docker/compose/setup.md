<!--
 * @Author: zhaix
 * @Date: 2022-03-30 00:53:31
 * @LastEditTime: 2022-04-19 11:35:34
 * @LastEditors: Do not edit
 * @FilePath: \goodstudy\网络技术-平台-框架\docker\compose\setup.md
 * @Description: 
-->
# docker-compose setup
1. v1 python
   1. `sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`
   2. sudo chmod +x /usr/local/bin/docker-compose
   3. sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
2. v2 golang
   1. https://github.com/docker/compose/releases
   2. rename; `mv ~/.docker/cli-plugins/`
   3. `docker compose version`