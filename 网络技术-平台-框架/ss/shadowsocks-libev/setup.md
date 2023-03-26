# setup debain
sudo systemctl enable shadowsocks-libev
sudo systemctl disable shadowsocks-libev
/etc/init.d/shadowsocks-libev start / restart / stop

 // pi3上可以远程使用此4431端口 -g
ssh -L 4431:localhost:443 zhaixiang@jp.bosstg.cn serveraliveinterval=30 -g

ssh -L 4400:localhost:xxx zhaixiang@ss.bosstg.cn -P xxx  serveraliveinterval=30 -g

## debian 10 ,11:
1. `apt install shadowsocks-libev`
2. `https://kiwivm.64clouds.com/xxx/main-exec.php?mode=blacklistcheck`  测试 ip
3. `https://cloud.digitalocean.com/`

```sh 
nano /etc/shadowsocks-libev/config.json

{
    "server": ["0.0.0.0"],
    "mode":"tcp_and_udp",
    "server_port":4430,
    "local_port":1080,
    "password":"sS`2012mm",
    "timeout":86400,
    "method":"aes-256-gcm"
}


/etc/init.d/shadowsocks-libev status

ufw allow 4430
```
