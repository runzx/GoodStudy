# SMB
1. init
```sh
apt install samba -y
smbpasswd -a zhaixiang

# ntfs3 要内核5.15+ 老的可用ntfs-3g
mount -t ntfs3 /dev/sda1 /data/ntfs500G


```

2. vi /etc/samba/smb.conf
```conf
#  不能用G:
[G_ntfs]                                 
comment = this is old zhaix-deskTop G: (1T)           
path =  /data   
guest ok = no
#可浏览目录             
browseable = yes
write list = zhaixiang


[ntfs_500G]
comment = this is old 500G           
path =  /data/ntfs500G
guest ok = no
#可浏览目录                 
browseable = yes                
write list = zhaixiang


[ntfs300G]
comment = this is old 300G
path =  /data/ntfs300G
guest ok = no
browseable = yes
write list = zhaixiang

```
3. 永久挂载
```sh
# blkid 可查看分区 uuid

/dev/sdb1: BLOCK_SIZE="512" UUID="A6AAB82AAAB7F4C1" TYPE="ntfs" PARTUUID="ea183865-01"
/dev/sdb2: LABEL="zx010901" BLOCK_SIZE="512" UUID="E000AA8C00AA696C" TYPE="ntfs" PARTUUID="ea183865-02"
/dev/sda1: LABEL="zx-20160925" BLOCK_SIZE="512" UUID="CADC2A85DC2A6C3F" TYPE="ntfs" PARTUUID="bd927b40-01"

nano /etc/fstab
UUID=E000AA8C00AA696C /data/ntfs300G ntfs-3g
UUID=CADC2A85DC2A6C3F /data/ntfs500G ntfs-3g
# 
/dev/sda1 /data/ntfs500G ntfs-3g defaults 0 2
```