# setup debain 11.3
1.  debian11 5.10.0-13-amd64
2.  debian-live-11.3.0-amd64-standard.iso 没桌面版 1G
3.  apt install openssl-server
4.  systemctl enable ssh
5.  nano /etc/sudoers
    1.  zhaixaing  ALL=(ALL:ALL) NOPASSWD:ALL
    2.  .ssh/authorized_keys 加入公钥
    3.  winscp sudo /usr/lib/openssh/sftp-server

6. 快照 3.5G
7. http://mirrors.163.com/debian 速度不行 