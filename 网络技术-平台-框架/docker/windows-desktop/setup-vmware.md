## Docker Machine VMware Workstation Driver

1. download `https://github.com/pecigonzalo/docker-machine-vmwareworkstation/releases`

`https://github.com/docker/machine/releases` mv $HOME/bin v0.16.2

2. mv docker-machine-driver-vmwareworkstation.exe 到 docker-machine.exe 目录下：`C:\Program Files\Docker\Docker\resources\bin`

3. `docker-machine create --driver=vmwareworkstation dev`
   自动下载 boot2docker v19.03.12 github
配置环境变量 docker-machine env dev 里内容：5个  

服务中，停止Docker for Windows Service，并且将其设为手动启动，避免每次开机就收到一个提示框。  

4. 启动 dev
   `docker-machine start dev`
5. 登录 docker 主机
   `docker-machine ssh dev`  
   `exit`

6. docker-machine 命令

```
ls
start / stop / restart / status
inspect  // 主机信息
ssh
rm
create
```

```
PS C:\windows\system32> docker-machine create --driver=vmwareworkstation dev
Creating CA: C:\Users\runzx\.docker\machine\certs\ca.pem
Creating client certificate: C:\Users\runzx\.docker\machine\certs\cert.pem
Running pre-create checks...
(dev) Image cache directory does not exist, creating it at C:\Users\runzx\.docker\machine\cache...
(dev) No default Boot2Docker ISO found locally, downloading the latest release...
(dev) Latest release for github.com/boot2docker/boot2docker is v19.03.12
(dev) Downloading C:\Users\runzx\.docker\machine\cache\boot2docker.iso from https://github.com/boot2docker/boot2docker/releases/download/v19.03.12/boot2docker.iso...
(dev) 0%....10%....20%....30%....40%....50%....60%....70%....80%....90%....100%
Creating machine...
(dev) Copying C:\Users\runzx\.docker\machine\cache\boot2docker.iso to C:\Users\runzx\.docker\machine\machines\dev\boot2docker.iso...
(dev) Creating SSH key...
(dev) Creating VM...
(dev) Creating disk 'C:\Users\runzx\.docker\machine\machines\dev\dev.vmdk'
(dev) Virtual disk creation successful.
(dev) Starting dev...
(dev) Waiting for VM to come online...
Waiting for machine to be running, this may take a few minutes...
Detecting operating system of created instance...
Waiting for SSH to be available...
Detecting the provisioner...
Provisioning with boot2docker...
Copying certs to the local machine directory...
Copying certs to the remote machine...
Setting Docker configuration on the remote daemon...
Checking connection to Docker...
Docker is up and running!
To see how to connect your Docker Client to the Docker Engine running on this virtual machine, run: C:\Program Files\Docker\Docker\resources\bin\docker-machine.exe env dev

PS C:\windows\system32> docker-machine env dev
$Env:DOCKER_TLS_VERIFY = "1"
$Env:DOCKER_HOST = "tcp://192.168.217.137:2376"
$Env:DOCKER_CERT_PATH = "C:\Users\runzx\.docker\machine\machines\dev"
$Env:DOCKER_MACHINE_NAME = "dev"
$Env:COMPOSE_CONVERT_WINDOWS_PATHS = "true"
# Run this command to configure your shell:
# & "C:\Program Files\Docker\Docker\resources\bin\docker-machine.exe" env dev | Invoke-Expression

PS C:\windows\system32> docker-machine ls
NAME   ACTIVE   DRIVER              STATE     URL                          SWARM   DOCKER      ERRORS
dev    -        vmwareworkstation   Running   tcp://192.168.217.137:2376           v19.03.12
PS C:\windows\system32> docker-machine ssh dev
   ( '>')
  /) TC (\   Core is distributed with ABSOLUTELY NO WARRANTY.
 (/-_--_-\)           www.tinycorelinux.net

docker@dev:~$ uname -a
Linux dev 4.19.130-boot2docker #1 SMP Mon Jun 29 23:52:55 UTC 2020 x86_64 GNU/Linux

```
