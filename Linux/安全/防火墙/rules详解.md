### 第一步,首先确定你的系统已经安装Iptables
`whereis iptables`  
保存本文件,使之生效,注意,iptables不需要重启,加载一次规则就成：  
`iptables-restore < /etc/iptables.test.rules`  
### 第二步:查看Iptables目前的配置信息
`iptables -L`
### 第三步:配置Iptables
### 第四步:保存生效的配置,让系统重启的时候自动加载有效配置
 编辑创建如下文件:
 `vi /etc/network/if-pre-up.d/iptables`  
 添加如下内容:
```perl
#!/bin/bash
/sbin/iptables-restore < /etc/iptables.test.rules
 ```
最后,设置可执行仅限  
`chmod +x /etc/network/if-pre-up.d/iptables`  

### 技巧 
1. 设置默认规则为丢弃,把下面的ACCEPT改为DROP     
```
:INPUT ACCEPT [0:0]  
# 该规则表示INPUT(进)表默认策略是ACCEPT  
:FORWARD ACCEPT [0:0]  
# 该规则表示FORWARD(转)表默认策略是ACCEPT  
:OUTPUT ACCEPT [0:0]  
# 该规则表示OUTPUT(出)表默认策略是ACCEPT  
```

`-A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT`  
 意思是允许进入的数据包只能是刚刚我发出去的数据包的回应，  

    ESTABLISHED：已建立的链接状态。  
    RELATED：该数据包与本机发出的数据包有关。

`-A INPUT -j REJECT --reject-with icmp-host-prohibited`  
`-A FORWARD -j REJECT --reject-with icmp-host-prohibited`  
 这两条的意思是在INPUT表和FORWARD表中拒绝所有其他不符合上述任何一条规则的数据包。并且发送一条host prohibited的消息给被拒绝的主机。 
 REJECT 是用来返回一个错误的包来回应匹配包，其他的等价于DROP，所以它是一个拒绝TARGET，在规则的结束。  
 这个TARGET仅仅用在INPUT,FORWARD和OUTPUT链和用户自定义的链，下列选项是用来定义返回错误的结果的：  
icmp-host-unreachable  
icmp-port-unreachable  

-m state --state <状态>  
 有数种状态，状态有： 
 - INVALID：无效的封包，例如数据破损的封包状态  
 - ESTABLISHED：已经联机成功的联机状态；  
 - NEW：想要新建立联机的封包状态；  
 - RELATED：这个最常用！表示这个封包是与我们主机发送出去的封包有关， 可能是响应封包或者是联机成功之后的传送封包！  

    这个状态很常被设定，因为设定了他之后，只要未来由本机发送出去的封包，
    即使我们没有设定封包的 INPUT 规则，该有关的封包还是可以进入我们主机， 可以简化相当多的设定规则


如果你想设置某ip段可以访问所有服务,你需要在iptables.test.rules文件中加入  
`-A INPUT -m iprange --src-range 192.168.1.1-192.168.1.199 -j ACCEPT`  
然后从第三步再设置一次。  

### 备份配置文件
`/sbin/iptables-save > /root/iptables-works-`date +%F``  // date  

恢复  
`/sbin/iptables-restore < /root/iptables-works-2018-09-11`  

### iusses
'ptables-restore v1.6.0: iptables-restore: unable to initialize table 'filter  
解决方法, 在文件头加:  
```
*filter
:INPUT ACCEPT [0:0]
:FORWARD ACCEPT [0:0]
:OUTPUT ACCEPT [0:0]

```