# ubuntu上vscode插件无法连接本地docker解决方法
1. 错误提示没有权限
2. 把当前用户添加到docker用户组
```
sudo groupadd docker          
sudo gpasswd -a $USER docker  
newgrp docker                 

```