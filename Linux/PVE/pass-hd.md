# 直通物理磁盘到虚拟机 (VM)
1. 于磁盘连接到物理和虚拟主机，这也将阻止虚拟机实时迁移
2. 第二个副作用是主机系统 IO 等待，当运行 ddrescue 时，主机上运行的其他 VM 可能会卡顿
3. https://pve.proxmox.com/wiki/Passthrough_Physical_Disk_to_Virtual_Machine_(VM)

4. ls -l /dev/disk/by-id/  列出磁盘
5. qm set  592  -scsi2 /dev/disk/by-id/ata-ST3000DM001-1CH166_Z1F41BLC
6. update VM 592: -scsi2 /dev/disk/by-id/ata-ST3000DM001-1CH166_Z1F41BLC
7. 
# container with physical disk  (lxc)
1. lxc-device add -n 102 /dev/sdb   // 临时的，在重新启动后无法生存
2. https://forum.proxmox.com/threads/container-with-physical-disk.42280/#post-203292
3. 配置中加
   1. /etc/pve/lxc/100.conf
   2. mp0: /dev/sdb1,mp=/mnt/esdb,backup=0

## NTFS 挂载到PVE
1. lsblk 查看所有分区
2. NTFS3 是内核态的驱动, 随 Linux 5.15 内核发布

```sh 
mkdir /mnt/sdc2 
# 只读挂载
mount -t ntfs /dev/sdc2 /mnt/sdc2 
# 读写方式 
mount -t ntfs3 /dev/sdc2 /mnt/sdc2 

# 开机自挂载
vi /etc/fstab 添加下行
# blkid 可查看分区 uuid
UUID=*** /data ntfs3

# 在PVE中添加目录 
ID ntfs1
目录 /mnt/sdc2

```