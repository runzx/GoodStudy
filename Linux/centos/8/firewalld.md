# centos7+ 默认使用 firewall

1. systemctl start firewalld.service
2. systemctl status firewalld
3. systemctl stop firewalld.service
4. systemctl disable firewalld #禁止防火墙随系统启动
5. firewall-cmd --state
6. firewall-cmd --list-ports
7. firewall-cmd --list-services
8. port

## 端口控制

- firewall-cmd --query-port=8080/tcp # 查询端口是否开放
- firewall-cmd --add-port=8080/tcp --permanent #永久添加 8080 端口例外(全局)
- firewall-cmd --remove-port=8800/tcp --permanent #永久删除 8080 端口例外(全局)
- firewall-cmd --add-port=65001-65010/tcp --permanent #永久增加 65001-65010 例外(全局)
- firewall-cmd --zone=public --add-port=8080/tcp --permanent #永久添加 8080 端口例外(区域 public)
- firewall-cmd --zone=public --remove-port=8080/tcp --permanent #永久删除 8080 端口例外(区域 public)
- firewall-cmd --zone=public --add-port=65001-65010/tcp --permanent #永久增加 65001-65010 例外(区域 public)
