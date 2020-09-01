## 开机自动挂载硬盘ntfs分区
1. sudo mkdir /media/zhaixiang/D
2. sudo chmod -R 777 /media/zhaixiang/D
3. sudo blkid   // 查看分区类型和uuid
4. sudo fdisk -l  // 查看硬盘信息 找到/dev/sda4 
5. sudo mount -t ntfs /dev/sda4 /media/zhaixiang/D
6. sudo nano /etc/fstab  
    /dev/sda4 /media/zhaixiang/D ntfs defaults 0 2  

7. sudo mount -a //保存后执行，没提示表示配置正确  

/dev/sda4: LABEL="M-hM-=M-/M-dM-;M-6" UUID="C3C438F1FE35C6F1" TYPE="ntfs" PARTUUID="66b2ea80-04"  

