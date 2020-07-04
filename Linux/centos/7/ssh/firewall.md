
`firewall-cmd --state` //查看防火墙是否打开，打开为running  
`firewall-cmd --zone=public --query-port=22/tcp` //端口如果开放则为yes,否则为no  

1. 关闭防火墙：`/bin/systemctl stop firewalld.service`  
2. 开放22端口：  
```
firewall-cmd --zone=public --add-port=22/tcp --permanent   //添加（--permanent永久生效，没有此参数重启后失效）
firewall-cmd --reload //添加完成后要重新载入
firewall-cmd --zone= public --query-port=22/tcp //查看
```