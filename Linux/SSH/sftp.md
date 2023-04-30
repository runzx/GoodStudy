# sftp
1. sftp -P 26560 name@host
2. 帮助手册: ? help
3. 本机命令 前面 加 ‘l’: lls, lpwd, lcd, lmkdir, lumask
4. remote host : ls, pwd, cd, cp, mkdir, chown, chmod, chgrp, df, rename, rm, rmdir, symlink, 
5. 在命令前面加一个！表示命令在本地主机上执行
  - ! 转到本地 shell, exit 再返回 sftp
6. 从远程主机下载文件: get rFile lFile
7. 从远程主机下载一个目录及其内容: get -r dir
8. 上传 put
9. 退出 exit bye