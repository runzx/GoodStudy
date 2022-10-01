# SMB
1. apt install samba -y
2. vi /etc/samba/smb.conf
3. smbpasswd -a zhaixiang

```conf
#  不能用G:
[G_ntfs]                                 
comment = this is old zhaix-deskTop G: (1T)           
path =  /data   
guest ok = no                   
browseable = yes           #可浏览目录         
write list = zhaixiang 

```