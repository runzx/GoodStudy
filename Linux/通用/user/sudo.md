# sudo
1. `sudo usermod -G wheel zhaixiang`  zhaixiang 加入组wheel
2. sudoers 里  `%wheel  ALL=(ALL)  NOPASSWD: ALL`
3. ？`zhaixiang  ALL=(ALL)  NOPASSWD:ALL` ,zhaixiang 不属于任何组 (/etc/group- 里没有)
4.  `ALL=(ALL)  NOPASSWD: /bin/kill,/bin/rm`  kill，rm不用密码
5.  如果 `@includedir /etc/sudoers.d`
    1.  在此目录下 文件`10-installer` 加 `zhaixiang  ALL=(ALL)  NOPASSWD:ALL`

6. sudo -l 可查看其状态
   1. 如有 `%sudo   ALL=(ALL:ALL) ALL` 在后，则 NOPASSWD 失效，此命令要加其后才生效