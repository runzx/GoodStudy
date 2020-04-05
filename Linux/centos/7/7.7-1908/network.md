
刚开始网上可能不工作， 改静态  
vm 上 NAT 网关 不是 .1, 而是.2,如192.168.271.2  

`vi /etc/sysconfig/network-scripts/ifcfg-ens33`  
ONBOOT=yes #默认no，这里改为yes，表示开启自动重启网卡
BOOTPROTO=static #网卡获取IP地址的方式，默认是dhcp  
并增加如下内容：
IPADDR=192.168.271.33   #配置网卡地址
NETMASK=255.255.255.0   #配置子网掩码
PREFIX=24               # 同上 2选1
GATEWAY=192.168.271.2   #配置网关
DNS1=192.168.271.2      #配置dns
DNS2=114.114.114.114    #配置dns
