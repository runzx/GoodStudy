# iptables forward

```sh
#!/bin/bash

ipset -N chnroute hash:net maxelem 65536

for ip in $(cat '/etc/chnroute.txt'); do
  ipset add chnroute $ip
done

iptables -t nat -N SHADOWSOCKS

# 直连服务器 IP
iptables -t nat -A SHADOWSOCKS -d [server_ip]/24 -j RETURN

# 允许连接保留地址
iptables -t nat -A SHADOWSOCKS -d 0.0.0.0/8 -j RETURN
iptables -t nat -A SHADOWSOCKS -d 10.0.0.0/8 -j RETURN
iptables -t nat -A SHADOWSOCKS -d 127.0.0.0/8 -j RETURN
iptables -t nat -A SHADOWSOCKS -d 169.254.0.0/16 -j RETURN
iptables -t nat -A SHADOWSOCKS -d 172.16.0.0/12 -j RETURN
iptables -t nat -A SHADOWSOCKS -d 192.168.0.0/16 -j RETURN
iptables -t nat -A SHADOWSOCKS -d 224.0.0.0/4 -j RETURN
iptables -t nat -A SHADOWSOCKS -d 240.0.0.0/4 -j RETURN

# 直连中国 IP
iptables -t nat -A SHADOWSOCKS -p tcp -m set --match-set chnroute dst -j RETURN
iptables -t nat -A SHADOWSOCKS -p icmp -m set --match-set chnroute dst -j RETURN

# 重定向到 ss-redir 端口
iptables -t nat -A SHADOWSOCKS -p tcp -j REDIRECT --to-port 10800
iptables -t nat -A SHADOWSOCKS -p udp -j REDIRECT --to-port 10800
iptables -t nat -A OUTPUT -p tcp -j SHADOWSOCKS

# 保存iptable
iptables-save > /etc/ss/iptables.conf

# 配置iptables，让其能在重启时自动动行并生效
# 编辑 /etc/network/if-pre-up.d/iptables，加入下面两行

#!/bin/sh
iptables-restore < /etc/ss/iptables.conf

# 执行
chmod +x /etc/network/if-pre-up.d/iptables
bash /etc/network/if-pre-up.d/iptables


# 只有CentOS上可以
service iptables save
# 它能把规则自动保存在/etc/sysconfig/iptables中。
# 当计算机启动时，rc.d下的脚本将用命令iptables-restore调用这个文件，从而就自动恢复了规则。

# Debian或Ubuntu 16.04或更高版本执行
apt --no-install-recommends install -y iptables-persistent
/etc/init.d/netfilter-persistent save # 可以进行保存规则，
/etc/init.d/netfilter-persistent reload # 可以将规则生效。
# flush 清附？ stop 
systemctl enable netfilter-persistent.service # auto 
```