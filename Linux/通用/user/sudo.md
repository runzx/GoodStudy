# sudo
1. `sudo usermod -G wheel zhaixiang`  zhaixiang 加入组wheel
2. sudoers 里  `%wheel  ALL=(ALL)  NOPASSWD: ALL`
3. ？`zhaixiang  ALL=(ALL)  NOPASSWD:ALL` ,zhaixiang 不属于任何组 (/etc/group- 里没有)
4.  `ALL=(ALL)  NOPASSWD: /bin/kill,/bin/rm`  kill，rm不用密码
5.  