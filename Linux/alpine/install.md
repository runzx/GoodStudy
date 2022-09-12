# install
1. 国内源
   -  `sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories`
   -  apk update
2. apk add openssh-server
   1. rc-update add sshd  // 自动启动
   2. /etc/init.d/sshd restart
   3. apk add openssh-sftp-server
3. apk add docker
   1. rc-update add docker boot // 开机自启动
   2. service docker start
   3. docker -v  , docker info
   4. apk add docker-compose
   5. https://wiki.alpinelinux.org/wiki/Docker
```sh

vi /etc/docker/daemon.json
{
"registry-mirrors": ["https://7fff2b1x.mirror.aliyuncs.com"]
}
```
4. remote vscode 
   1. vi /etc/ssh/sshd_config
      1. AllowTcpForwarding yes
   2. apk add bash  gcompat libstdc++ curl

## adduser
1. adduser zhaixiang
2. ssh-genenkey
3. .ssh/authorized_keys   // 600
4. sudo /usr/lib/ssh/sftp-server // winscp