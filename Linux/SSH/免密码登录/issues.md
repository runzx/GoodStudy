1. debian 用useradd 增加用户时没加home 手工补后导致权限不符合要求  
查看 /var/log/auth.log :   
Apr  5 12:00:08 band sshd[3511]: Authentication refused: bad ownership or modes for directory /home/zhaixiang  

解决方法:  
`root@band:~# chmod 700  /home/zhaixiang`  
