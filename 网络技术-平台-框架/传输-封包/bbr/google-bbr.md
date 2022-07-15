# bbr
1. 查看 `sysctl net.ipv4.tcp_available_congestion_control`  
2. linux core >=4.10
3. 服务端开能就行

```sh 
echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf
echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf
# 保存生效
sysctl -p

lsmod | grep bbr

```