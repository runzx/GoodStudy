# 挂载 U 盘

```bash
mkdir /mnt/usb  //创建一个目录，用于挂载U盘
fdisk -l        //查看系统中挂载的U盘，若系统有一块硬盘sdb1 代表你的U盘，/dev/sdb1表明机器已识别U盘，
mount /dev/sdb1 /mnt/usb //把U盘/dev/sdb1挂载到/mnt/usb目录下
cd /mnt/usb     //进入U盘目录，即可查看U盘里内容
umount /mnt/usb 或者 umount /dev/sdb1 //卸载U盘
```
