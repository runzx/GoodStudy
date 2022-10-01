# 非 root 操作 Docker

1. 创建 docker 组。
   - `sudo groupadd docker`
2. 将您的用户添加到 docker 组中。
   - `sudo usermod -aG docker $USER`
   - `addgroup $USER docker`  // alpine
3. 注销并重新登录;
   - 在虚拟机上进行测试，可能需要重新启动虚拟机才能使更改生效
   - 在 Linux 上，您还可以运行以下命令来激活对组的更改
     - `newgrp docker `
4. `sudo usermod -aG docker $USER  && newgrp docker`