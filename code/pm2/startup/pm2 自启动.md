# pm2 自启动

0. Generating a startup script

```sh
  pm2 startup [ubuntu | ubuntu14 | ubuntu12 | centos | centos6 | arch | oracle | amazon | macos | darwin | freebsd | systemd | systemv | upstart | launchd | rcd | openrc]
  # 禁用启动系统
    pm2 unstartup
  # 如果出成下面提示，复制运行sudo su ....
    [PM2] You have to run this command as root. Execute the following command:
      sudo su -c "env PATH=$PATH:/home/unitech/.nvm/versions/node/v4.3/bin pm2 startup <distribution> -u <user> --hp <home-path>
```

1. 启动所有要管理的应用程序后，可以通过键入以下命令将列表保存到预期/意外的服务器重启：
   `pm2 save`
   以查看 more ~/.pm2/dump.pm2
   手动复活流程
   这将恢复以前保存的进程（通过 pm2 保存）：
   pm2 resurrect
   用户权限
   假设您希望启动脚本在另一个用户下执行。
   只需使用-u <username>选项和--hp <user_home>：
   `pm2 startup centos -u zhaixiang --hp /home/zhaixiang`
2. 更新启动脚本
   要更新启动脚本（例如，如果您通过 NVM 更改了 Node.js 版本），请运行以下命令：
   `pm2 unstartup`
   `pm2 startup`
3. SystemD 安装检查

```sh
  #  Check if pm2-<USER> service has been added
systemctl list-units
  # -  Check logs
journalctl -u pm2-<USER>
  # - Cat systemd configuration file
systemctl cat pm2-<USER>
  # - Analyze startup
systemd-analyze plot > output.svg
  # 要有效地等待该机器在线运行PM2：
    [Unit]
    Wants=network-online.target
    After=network.target network-online.target

    [....]

    [Install]
    WantedBy=multi-user.target network-online.target
```

4. 运行 pm2 startup 结果：

```sh
[root@izwz9fn7x0vybz20vmgg7az pd123]# pm2 startup centos
[PM2] Init System found: systemd
-----------------------------------------------------------
 PM2 detected systemd but you precised centos
 Please verify that your choice is indeed your init system
 If you arent sure, just run : pm2 startup
-----------------------------------------------------------
Platform centos
Template
[Unit]
Description=PM2 process manager
Documentation=https://pm2.keymetrics.io/
After=network.target

[Service]
Type=forking
User=root
LimitNOFILE=infinity
LimitNPROC=infinity
LimitCORE=infinity
Environment=PATH=/usr/bin:/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin
Environment=PM2_HOME=/root/.pm2
PIDFile=/root/.pm2/pm2.pid

ExecStart=/usr/lib/node_modules/pm2/bin/pm2 resurrect
ExecReload=/usr/lib/node_modules/pm2/bin/pm2 reload all
ExecStop=/usr/lib/node_modules/pm2/bin/pm2 kill

[Install]
WantedBy=multi-user.target

Target path
/etc/systemd/system/pm2-root.service
Command list
[ 'systemctl enable pm2-root' ]
[PM2] Writing init configuration in /etc/systemd/system/pm2-root.service
[PM2] Making script booting at startup...
[PM2] [-] Executing: systemctl enable pm2-root...
Created symlink from /etc/systemd/system/multi-user.target.wants/pm2-root.service to /etc/systemd/system/pm2-root.service.
[PM2] [v] Command successfully executed.
+---------------------------------------+
[PM2] Freeze a process list on reboot via:
$ pm2 save

[PM2] Remove init script via:
$ pm2 unstartup centos
```
