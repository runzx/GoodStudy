# setup docker 
1. s

```sh
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo add-apt-repository \
   "deb [arch=amd64] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

sudo apt update

sudo apt install -y docker-ce

sudo service docker start
# 加速
vi /etc/docker/daemon.json

{
  "registry-mirrors": ["https://aj2rgad5.mirror.aliyuncs.com"]
}

#  compose setup v2
# 1. download  https://github.com/docker/compose/releases
mv 'docker-compose-linux-x86_64' ~/.docker/cli-plugins/docker-compose
chmod +x  ~/.docker/cli-plugins/docker-compose
# 查看安装 状态
docker compose version

```