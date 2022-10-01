# lxc 
0. pveam available 查看模版
1. 下载模板到存储
   1. pveam download local debian-9-turnkey-tomcat_15.1-1_amd64.tar.gz 
   2. pveam list local  // 查看存储local中的模板    
2. install alpine 
   1. local CT模版 '模版' 选择对应版本
   2. '创建CT' -> 
      1.  CT ID 可用自动生成(100开始), 设密码或公钥
      2. ct 模版选择 

##  Linux Containers
1. 供轻量级的的虚拟化，注意是操作系统级别的
2. 和宿主机共用内核，所以只能安装各种Linux发行版，不能安装windows等其他系统

## KVM 的英文全称为 Kernel-based Virtual Machine
1. 基于硬件的完全虚拟化，注意是硬件级别的
2. 更好的隔离性和安全性
## conf 
1. /etc/pve/lxc/100.conf

```
arch: amd64
cores: 4
features: nesting=1
hostname: alpine315
memory: 8096
net0: name=eth0,bridge=vmbr0,gw=192.168.3.1,hwaddr=92:75:0A:5A:ED:2B,ip=192.168.3.38/24,type=veth
onboot: 1
ostype: alpine
rootfs: local-lvm:vm-100-disk-0,size=40G
swap: 8096
unprivileged: 1

```

2. /var/lib/lxc/100/config