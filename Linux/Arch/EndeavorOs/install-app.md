# setup

1. sudo pacman -S code
2. 常用

   1. pacman -Ss abc #搜索有关 abc 信息的包
   2. pacman -Sy abc #和源同步后安装名为 abc 的包
   3. pacman -S abc #从本地数据库中得到 abc 的信息，下载安装 abc 包
   4. pacman -Q # 列出已经安装的软件包
   5. pacman -Q abc # 检查 abc 软件包是否已经安装
   6. pacman -Qi abc #列出已安装的包 abc 的详细信息
   7. pacman -Syu #同步源，并更新系统
   8. pacman -Sy #仅同步源
   9. pacman -Su #更新系统
   10. pacman -R abc #删除 abc 包
   11. Pacman 配置文件/etc/pacman.conf
   12. pacman -Sw package_name 下载包而不安装它

3. 清除无用的包
   1. sudo pacman -R $(pacman -Qdtq)
4. ifconfig,route 在 net-tools 中，
   1. nslookup,dig 在 dnsutils 中，
   2. ftp,telnet 等在 inetutils 中
   3. ,ip 命令在 iproute2 中
5. 使用包文件加入一个新的软件包
   1. pacman --add foo.pkg.tar.gz
   2. pacman -A foo.pkg.tar.gz
   3. pacman --upgrade foo.pkg.tar.gz // 升级软件包
   4. pacman -U foo.pkg.tar.gz
6. rsync替代scp，其拥有即时压缩，差量传输等新特性。
   1. rsync也被用来进行备份操作。
   2. rsync foo.txt me@server:/home/me/   # 最基础的复制文件 与scp的操作完全相同
   3. rsync -a bar/ me@server:/home/me/   # -a 标记实现目录复制等 比scp -r 能更好的处理符号链接等情况
7. sudo dmidecode 查看 硬件信息
   1. cat /proc/cpuinfo cpu信息
   2. lsusb -tv  查看usb
   3. clock -w 将时间修改保存到 BIOS
8. 文件搜索
   1. whereis npm
   2. which
   3. find / -name *.rpm -exec chmod 755 ‘{}’ ; 搜索以 ‘.rpm’ 结尾的文件并定义其权限
   4. find /usr/bin -type f -atime +100 搜索在过去100天内未被使用过的执行文件
   5. find /usr/bin -type f -mtime -10 搜索在10天内被创建或者修改过的文件
9. 修改 主机名
   1.  sudo hostnamectl set-hostname xxx
   2.  