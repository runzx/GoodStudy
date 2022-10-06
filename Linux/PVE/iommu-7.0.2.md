# pve 7.0.11
1. /etc/pve/qemu-server/100.conf

```sh
nano /etc/pve/qemu-server/100.conf
# 首行加
args: -set device.hostpci0.x-igd-gms=1
# 核显
hostpci0: 0000:00:02,legacy-igd=1

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

# 下面是可以显示直通
args: -set device.hostpci0.x-igd-gms=1
boot: order=ide2;sata0;net0
cores: 8
cpu: host
hostpci0: 0000:00:02,legacy-igd=1
ide2: local:iso/en_windows_thin_pc_x86_697681.iso,media=cdrom,size=1540020K
machine: pc-i440fx-6.0
memory: 12048
name: win
net0: e1000=A6:CC:E1:EA:68:B1,bridge=vmbr0,firewall=1
numa: 0
ostype: win10
sata0: local-lvm:vm-100-disk-0,size=32G
scsihw: virtio-scsi-pci
smbios1: uuid=4e780ea7-8b7d-4ee6-829a-18b963f4290d
sockets: 1
vmgenid: 850d1ae4-a8b5-4e95-826b-84928db84950

```