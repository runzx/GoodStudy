# PROXMOX关闭屏幕
1. https://forum.proxmox.com/threads/ve-5-1-host-how-to-turn-off-laptop-screen.38115/ 

```sh
setterm -blank 5 //5分钟后关闭屏幕，5可以改成别的整数

# 永久修改
GRUB_CMDLINE_LINUX="consoleblank=300" //每次开机后无操作都是5分钟关闭屏幕 单位是秒
```

2. 设置笔记本合盖系统不睡眠

```sh
grep -r HandleLidSwitch /etc/systemd/logind.conf
#HandleLidSwitch=suspend

#HandlePowerKey     按下电源键后的行为，  默认 power off
#HandleSleepKey     按下挂起键后的行为，  默认 suspend
#HandleHibernateKey 按下休眠键后的行为，  默认 hibernate
#HandleLidSwitch    合上笔记本盖后的行为，默认 suspend
                      # ignore :即合盖不休眠


sed -i 's/#HandleLidSwitch=suspend/HandleLidSwitch=ignore/g' /etc/systemd/logind.conf
systemctl restart systemd-logind.service

```