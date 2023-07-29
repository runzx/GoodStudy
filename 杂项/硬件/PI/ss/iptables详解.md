# iptables 详解

1. 规则 rules

   1. 放行（accept）、拒绝（reject）和丢弃（drop）
   2. 源地址、目的地址、传输协议、 服务类型（如 HTTP、FTP 和 SMTP）
   3. 基本语法格式
      1. `iptables [-t 表名] 命令选项 ［链名］ ［条件匹配］ ［-j 目标动作或跳转］`

2. 传输包流程

   1. 当一个数据包进入网卡时，它首先进入 PREROUTING 链，内核根据数据包目的 IP 判断是否需要转送出去
   2. 数据包就是进入本机的，到达 INPUT 链。
   3. 本机上运行的程序可以发送数据包，这些数据包会经过 OUTPUT 链，然后到达 POSTROUTING 链输出
   4. 数据包是要转发出去的，且内核允许转发，数据包就会如图所示向右移动，经过 FORWARD 链，然后到达 POSTROUTING 链输出

3. 表 tables

- 内置了 4 个表，即 filter 表、nat 表、mangle 表和 raw 表

4. 链（chains）
   1. 数据包传播的路径，每一条链其实就是众多规则中的一个检查清单
   2. 每一条链中可以有一 条或数条规则
   3. PREROUTING, INPUT, FORWARD, OUTPUT, POSTROUTING

## COMMAND

1. -A 在指定链的末尾添加（append）一条新的规则
2. -D 删除（delete）指定链中的某一条规则，可以按规则序号和内容删除
3. -I 在指定链中插入（insert）一条新的规则，默认在第一行添加
4. -R 修改、替换（replace）指定链中的某一条规则，可以按规则序号和内容替换
5. -L 列出（list）指定链中所有的规则进行查看
6. -E 重命名用户定义的链，不改变链本身
7. -F 清空（flush）
8. -N 新建（new-chain）一条用户自己定义的规则链
9. -X 删除指定表中用户自定义的规则链（delete-chain）
10. -P 设置指定链的默认策略（policy）
11. -Z 将所有表的所有链的字节和数据包计数器清零
12. -n 使用数字形式（numeric）显示输出结果
13. -v 查看规则表详细信息（verbose）的信息
14. -V 查看版本(version)
15. -h 获取帮助（help）
16.

## METHOD

1. ACCEPT 允许数据包通过
2. DROP 直接丢弃数据包，不给任何回应信息
3. REJECT 拒绝数据包通过，必要时会给数据发送端一个响应的信息。
4. LOG 在/var/log/messages 文件中记录日志信息，然后将数据包传递给下一条规则

```

```

### iptables 防火墙规则的保存与恢复

1. iptables-save 把规则保存到文件中，
2. rc.d 下的脚本（/etc/rc.d/init.d/iptables）自动装载
3. service iptables save
   1. 自动保存在 /etc/sysconfig/iptables 中

```SH
# 允许防火墙本机对外开放TCP端口20、21、25、110以及被动模式FTP端口1250-1280
iptables -A INPUT -p tcp -m multiport --dport 20,21,25,110,1250:1280 -j ACCEPT

# 禁止转发源IP地址为192.168.1.20-192.168.1.99的TCP数据包
iptables -A FORWARD -m state --state NEW -p tcp ! --syn -j DROP

# 拒绝访问防火墙的新数据包，但允许响应连接或与已有连接相关的数据包
iptables -A INPUT -p tcp -m state --state NEW -j DROP
iptables -A INPUT -p tcp -m state --state ESTABLISHED,RELATED -j ACCEPT
# ESTABLISHED”表示已经响应请求或者已经建立连接的数据包，“RELATED”表示与已建立的连接有相关性的，比如FTP数据连接等

# 只开放本机的web服务（80）、FTP(20、21、20450-20480)
# 放行外部主机发住服务器其它端口的应答数据包
iptables -I INPUT -p tcp -m multiport --dport 20,21,80 -j ACCEPT 
iptables -I INPUT -p tcp --dport 20450:20480 -j ACCEPT 
iptables -I INPUT -p tcp -m state --state ESTABLISHED -j ACCEPT 
iptables -P INPUT DROP

# 允许转发来自192.168.0.0/24局域网段的DNS解析请求数据包
iptables -A FORWARD -s 192.168.0.0/24 -p udp --dport 53 -j ACCEPT
iptables -A FORWARD -d 192.168.0.0/24 -p udp --sport 53 -j ACCEPT

# 只允许管理员从202.13.0.0/16网段使用SSH远程登录防火墙主机。
iptables -A INPUT -p tcp --dport 22 -s 202.13.0.0/16 -j ACCEPT
iptables -A INPUT -p tcp --dport 22 -j DROP

# 封堵网段（192.168.1.0/24），两小时后解封
iptables -I INPUT -s 10.20.30.0/24 -j DROP
iptables -I FORWARD -s 10.20.30.0/24 -j DROP
# at now 2 hours 
iptables -D INPUT 1 
iptables -D FORWARD 1

# delete 
sudo iptables -t nat -F
sudo iptables -t nat --list

```
