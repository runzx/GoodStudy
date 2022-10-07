# pve 安装桌面
1. tasksel
2. adduser zhaixiang  // 默认root账户不给登录图像界面
3. dpkg -i vscode.deb

## pve instal KDE桌面
1. lcx容器问题
   1. cpu 占用高 system-udevd
      1. `systemctl mask udisk2.service`
      2. `systemctl stop udisk2.service`
   2. 特权容器不能启动