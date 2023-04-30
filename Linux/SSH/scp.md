# scp
```sh
scp [参数] [源路径] [目标路径]


scp local_file remote_username@remote_ip:remote_folder 
scp local_file remote_ip:remote_folder 
# -r 拷贝目录 -v log信息 -p 保留原文件的权限、时间 
scp -P 26560 -r ss.bosstg.cn:work/app/ .
```