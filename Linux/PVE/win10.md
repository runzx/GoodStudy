# windows 10 
1. 安装后关闭 休眠;
```sh
creating vzdump archive '/var/lib/vz/dump/vzdump-qemu-101-2022_10_07-01_54_12.vma.zst'

nano /etc/pve/qemu-server/101.conf
# windows10 直通
args: -set device.hostpci0.x-igd-gms=1
boot: order=sata0;ide2;net0;ide0
cores: 8
cpu: host
hostpci0: 0000:00:02,legacy-igd=1
ide0: local:iso/virtio-win-0.1.221.iso,media=cdrom,size=519030K
ide2: local:iso/SW_DVD9_WIN_ENT_LTSC_2021_64BIT_ChnSimp_MLF_X22-84402.ISO,media=cdrom
machine: pc-i440fx-6.0
memory: 12048
name: win10
net0: e1000=3A:3D:62:C7:79:8E,bridge=vmbr0,firewall=1
numa: 1
ostype: win10
sata0: local-lvm:vm-101-disk-0,size=32G,ssd=1
scsihw: virtio-scsi-pci
smbios1: uuid=38b76d89-499d-4afd-8393-483935981043
sockets: 1
usb0: host=1c4f:0002,usb3=1
usb1: host=046d:c534,usb3=1
vga: none
vmgenid: 263ab987-c250-4b62-ad30-b5446a1e5c73
```
2. 返回宿主机显示钩子脚本
   1. 要加黑名单的不行
   2. `git clone https://github.com/HelloZhing/pvevm-hooks.git` sh角本