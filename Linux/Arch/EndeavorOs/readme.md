# 
1. `sudo systemctl stop firewalld` 关闭防火墙
   1. sudo systemctl disable --now firewalld
   2. sudo pacman -R firewalld
2. `sudo firewall-cmd --zone=public --add-port=27017/tcp --permanent` 
   1. sudo systemctl restart firewalld 重启后生效