# debian install docker
1. https://docs.docker.com/engine/install/debian/
2. sudo apt-get remove docker docker-engine docker.io containerd runc

```sh 
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
# 
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
# 
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
# 换成 中科大 
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://mirrors.ustc.edu.cn/docker-ce/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin
# /etc/docker/daemon.json
{
  "registry-mirrors": [
    "https://7fff2b1x.mirror.aliyuncs.com",
    "https://docker.mirrors.ustc.edu.cn"
  ]
}
```