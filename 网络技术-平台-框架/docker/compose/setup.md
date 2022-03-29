# docker-compose setup
1. v1 python
   1. `sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose`
   2. sudo chmod +x /usr/local/bin/docker-compose
   3. sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
2. v2 golang
   1. https://github.com/docker/compose/releases
   2. rename; `mv ~/.docker/cli-plguins/`
   3. `docker compose version`