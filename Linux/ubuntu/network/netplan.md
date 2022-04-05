# netplan v18+

1. 从 17.10 版本开始， Netplan 是 Ubuntu 上的默认网络管理工具，替换了以前用于在 Ubuntu 上配置网络的配置文件/etc/network/interfaces
2. /etc/netplan/\*.yml
3. NetworkManager 桌面； Systemd-networkd 服务器
4. sudo netplan apply 应用更改

```yml
# Let NetworkManager manage all devices on this system
network:
  version: 2
  #  renderer: NetworkManager  # 默认使用systemd-workd
  renderer: networkd

  ethernets:
    enp7s0:     # zhaix-PC
      dhcp4: no
      addresses:
        - 192.168.3.33/24
      gateway4: 192.168.3.1
      nameservers:
        addresses: [192.168.3.1, 223.6.6.6]
```
