# 静态路由

## 各网段 内部通讯

0. `route add -net 192.168.2.0 netmask 255.255.255.0 gateway 192.168.1.39` 增加静态路由，uci 好象失效

- `ip route get 192.168.2.177` 查看效果
- /etc/config/network 保存位置

1. `iptables -t nat -A POSTROUTING -s 192.168.1.0/24 -j MASQUERADE` 192.168.3.1 路由器上防火墙加这条

- 由于家用路由器 WAN 口固化了 NAT，只能用 NAT 转换

2. `traceroute 192.168.2.177` 查看路由过程

3. 端口映射

- 本机的 2222 端口映射到内网 虚拟机的 22 端口
- `iptables -t nat -A PREROUTING -d 210.14.67.127 -p tcp --dport 2222 -j DNAT --to-dest 192.168.188.115:22`

4. 保存规则到配置文件中

- `iptables-save > /etc/sysconfig/iptables`

## MASQUERADE（伪装）

1. MASQUERADE 是最常用的处理目标，因为大多数情况下，路由器并没有一个固定的 IP 地址。我们的路由器是通过 PPPoE 拨号上网或者是通过 DHCP 自动分配的 IP 地址。这 个处理目标和 SNAT 处理目标作用是一样的，区别就是它不需要指定源地址。
2. MASQUERADE 是被专门设计用于那些动态获取 IP 地址的连接，比如拨号上网、DHCP 连接等。
3. 如果你有固定的 IP 地址，还是用 SNAT 处理目标，这样可以节省计算资源。
4. MASQUERADE 只能用于 nat 表的 POSTROUTING 链。
5. 例如：局域网来自 192.168.6.0 网络的报文通过 MASQUERADE 进行源地址转换。
   `iptables -t nat -A POSTROUTING –s 192.168.6.0/24 –o eth0 -j MASQUERADE`
