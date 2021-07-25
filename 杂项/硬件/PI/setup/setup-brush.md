# 2021-05-07-raspios-buster-armhf-lite.img
Linux pi3 5.10.17-v7+ #1414  

1. pi raspiberry  
   `sudo raspi-config`
2. `sudo nano /etc/apt/sources.list`

```
deb https://mirrors.aliyun.com/raspbian/raspbian/ buster main non-free contrib
deb-src https://mirrors.aliyun.com/raspbian/raspbian/ buster main non-free contrib

```

eth0: b8:27:eb:83:b9:82
wlan0 b8:27:eb:d6:ec:d7

4. static ip

```
sudo nano /etc/dhcpcd.conf

```