
/boot/uEnv.ini

FDT=/dtb/amlogic/meson-gxl-s905d-phicomm-n1.dtb


系统从 U 盘启动后，使用 root 用户名和密码 1234 登陆系统，首次登陆会要求修改密码，然后可以使用 ctrl+c 跳过新建非 root 用户。进入系统后使用以下命令将系统写入 N1 盒子：

./install-aml.sh
提示写入成功后，使用 poweroff 命令关机，然后拔掉 U 盘重启就可以正常使用 eMMC 中的 Armbian 了。当然，如果不想写入 eMMC，在 U 盘中使用其实也是比较顺滑的。


cp /etc/apt/sources.list /etc/apt/sources.list.bak

deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ bionic main restricted universe multiverse
#deb-src http://ports.ubuntu.com/ bionic main restricted universe multiverse

deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ bionic-security main restricted universe multiverse
#deb-src http://ports.ubuntu.com/ bionic-security main restricted universe multiverse

deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ bionic-updates main restricted universe multiverse
#deb-src http://ports.ubuntu.com/ bionic-updates main restricted universe multiverse

deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu-ports/ bionic-backports main restricted universe multiverse
#deb-src http://ports.ubuntu.com/ bionic-backports main restricted universe multiverse


设置固定ip，修改 /etc/network/interfaces 文件

# Wired adapter #1
#allow-hotplug eth0
auto eth0
no-auto-down eth0
#iface eth0 inet dhcp
iface eth0 inet static
address 192.168.3.10
netmask 255.255.255.0
gateway 192.168.3.1
dns-nameservers 192.168.3.1 114.114.114.114
# hwaddress ether # if you want to set MAC manually
# pre-up /sbin/ifconfig eth0 mtu 3838 # setting MTU for DHCP, static just: mtu 3838


执行 armbian-config，选择 personal，选择 Timezone 中为 Shanghai。

