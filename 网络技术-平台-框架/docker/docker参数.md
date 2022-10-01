# 容器运行时参数

1. 容器运行时的一些参数设置, 在整个容器运行过程中非常重要, 设置不好会严重影响容器的安全性、性能, 下面就讲讲容器运行时需要考虑设置的一些比较重要的参数。

2. 为容器创建一个 AppArmor Profile 文件: AppArmor Profile 文件里面包含了各种威胁的安全策略, 通过它可以保护宿主机系统和应用程序的各种威胁, 设置参数如:
   - `docker run -interactive -tty -security-opt="apparmor:PROFILENAME" centos /bin/bash`
3. 开启 SELinux Security 选项: SELinux 提供了强制访问控制, 增强了自主访问模型, 可以通过 SELinux 为系统增加一层额外的安全层, 设置参数如:
   - `docker run -interactive -tty -security-opt label=level:TopSecret centos /bin/bash`
4. 为容器限制 Linux 内核的 Capabilities 能力: Linux 把原来和超级用户相关的高级权限划分成为不同的单元, 称为 Capability, 这样就可以独立对特定的 Capability 进行开启或禁止, 来增加容器的安全, 设置参数如:
   - `docker run -interactive -tty -cap-drop=all -cap-add={“NET_ADMIN","SYS_ADMIN"} centos:latest /bin/bash`
5. 以只读的模式挂载容器的 root 文件系统, 设置参数如:
   - `docker run -interactive -tty -read-only -volume /centdata centos /bin/bash`
6. 设置容器在失败的时候尝试重启的次数: 若不设置的话, 重启则会不断的尝试重启, 参数如:
   - `docker run -detach -restart=on-failure:5 nginx`。
7. 不要挂载宿主机上敏感的目录到容器上,
   - 或是以只读的方式挂载
   - 如宿主机上这些目录: /、/boot、/dev、/etc、/lib、/proc、/sys、/usr;
8. 在容器里面最好不要运行 ssh 服务:
   - 使用 docker exec 或 docker attach 来查看容器实例;
9. 容器运行时不要映射 privileged 的端口:

   - 处于安全考虑, privileged 的 TCP/IP 端口约束在 1024 以下, 一般的用户是不能使用这个端口;

10. 使用可信任的镜像来创建容器: Docker 官方或非官方的镜像有很多漏洞, 若使用它们来运行容器, 很容易被攻击,

    - 建议使用 Docker 官方认证过的镜像,
    - 或是自己构建的镜像（建议采用 Alpine 作为基础镜像）,
    - 并通过漏洞扫描工具（如 Clair）;

11. 创建一个非 root 用户的容器: 容器拥有 root 权限, 很容易让人通过容器的 root 权限攻击所在的宿主机, 可以在制作镜像的时候指定用户,

    - 如: `RUN useradd -d /home/username -m -s /bin/bash username`。

12. 开启 Docker 的 Content Trust 选项: Content Trust 会将数据通过数字签名发送到远程的 Docker Registries 或是从远程的 Docker Registries 接收数据, 用来保证镜像在 build, create, pull, push, run 过程中没有被篡改,
    - 开启命令: `export DOCKER_CONTENT_TRUST=1`;
13. 只允许可信任的用户来控制 Docker Daemon: Docker Daemon 控制需要 root 特权,
    - 推荐将可信任的用户加入到一个组中, 并将整个组授予 root 特权;
14. 单独为容器划分一个分区作为容器的存储空间:
    - 所有容器的数据、元数据默认都存储在/var/lib/docker 下（当然可以修改 docker 容器默认的存储路径）, 很容易造成争抢磁盘空间, 导致系统崩溃,
    - 推荐在内部存储中单独划分一个分区挂载到该目录上, 同样的方法也可以使用外部存储;
