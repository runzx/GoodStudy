# shadowsocks-libev install
1. apt install shadowsocks-libev 

```sh
sudo nano /etc/shadowsocks-libev/config.json
`
{
    "server":["::"],
    "mode":"tcp_and_udp",
    "server_port":4430,
    "local_port":1080,
    "password":"sS`2012mm",
    "timeout":600,
    "method":"aes-256-gcm"
}
`
/etc/init.d/shadowsocks-libev start    # start|stop|status|restart|force-reload

sudo systemctl status shadowsocks-libev
sudo systemctl disable shadowsocks-libev

```