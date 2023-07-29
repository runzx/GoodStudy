# ipset

```sh
sudo apt install -y ipset

# 下载分配给国内运营商的 IP 段
curl 'http://ftp.apnic.net/apnic/stats/apnic/delegated-apnic-latest' | grep ipv4 | \
grep CN | awk -F\| '{ printf("%s/%d\n", $4, 32-log($5)/log(2)) }' > chnroute.txt


# 创建一个集合并把上述IP段加进去
sudo ipset create chnroute hash:net

cat /etc/ss/chnroute.txt | sudo xargs -I ip ipset add chnroute ip

# 上一条命令执行的非常慢，所以把结果保存下来，下次直接从文件恢复
sudo bash -c "ipset save chnroute > /etc/ss/chnroute.ipset"

ipset add myset 14.144.0.0/12
ipset add myset 27.8.0.0/13
ipset add myset 58.16.0.0/15
# 或者添加一个timeout时间
ipset add test 192.168.0.1 timeout 3600


# 新建的ipset集合丢到iptables里
iptables -I INPUT -m set --match-set myset src -j DROP

iptables -t nat -A SHADOWSOCKS -p icmp -m set --match-set chnroute dst -j RETURN
# 放行大陆地址段
iptables -t nat -A SHADOWSOCKS -m set --match-set chnroute dst -j RETURN

# ipset默认可以存储65536个元素，使用maxelem指定数量
ipset create blacklist hash:net maxelem 1000000    #黑名单

# 查看已创建的ipset
ipset list

# ipset持久化
ipset save > /etc/ipset.conf
ipset save myset -f /etc/ipset_myset.txt
ipset save chnroute -f /etc/ss/chnroute.ipset
# 导入 ipset规则
ipset restore -f /etc/ipset_myset.txt

# 删除名为“myset”的集合。
ipset destroy myset


# /etc/rc.local 自动导入
ipset restore < /etc/ss/chnroute.ipset

```