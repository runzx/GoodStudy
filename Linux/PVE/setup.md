# pve setup
1. 国内下载源 `https://mirrors.ustc.edu.cn/proxmox/iso/`
2. sources

```sh 
# /etc/apt/sources.list
sed -i 's|^deb http://ftp.debian.org|deb https://mirrors.ustc.edu.cn|g' /etc/apt/sources.list
sed -i 's|^deb http://security.debian.org|deb https://mirrors.ustc.edu.cn/debian-security|g' /etc/apt/sources.list

source /etc/os-release
echo "deb https://mirrors.ustc.edu.cn/proxmox/debian/pve $VERSION_CODENAME pve-no-subscription" > /etc/apt/sources.list.d/pve-no-subscription.list

# 替换 CT Templates 的源
cp /usr/share/perl5/PVE/APLInfo.pm /usr/share/perl5/PVE/APLInfo.pm_back
sed -i 's|http://download.proxmox.com|https://mirrors.ustc.edu.cn/proxmox|g' /usr/share/perl5/PVE/APLInfo.pm

# /usr/share/perl5/PVE/APLInfo.pm
# 重启后生效
```
## https://pve.proxmox.com/wiki/Main_Page
1. 虚拟机是使用 kvm，容器使用 LXC
2.  web 管理界面的 Template 模板中点击 “下载” web、mariadb、redis 应用


### v7.2
1. debian 11.3 Bullseys
2. Kernel 5.15 ZFS 2.1.4
3. QEMU 6.2 LXC 4.0.12

### access
1. `https://192.168.3.36:8006`

### error
1. .../pve/dists/bullseye/InRelease 401 
   1. /etc/apt/sources.list.d/pve-enterprise.list 注释 pve源


### lxc 密码修改
1. `pct list`
2. `pct enter VMID` 进入lxc 内， 
   1. `passwd`修改密码

### https://ciasm.blog.csdn.net/article/details/125688877

### iusse
1. thinkCentre M82 安装后不能启动： 升级BIOS (iso 制作盘)