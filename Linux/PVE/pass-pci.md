# 直通显卡
`https://gitee.com/spoto/PVE_Generic_AIO`  
0. 更新GRUB：
```sh
nano /etc/default/grub
"quiet intel_iommu=on iommu=pt video=efifb:off,vesafb:off"

root@pve:~# update-grub
Generating grub configuration file ...
Found linux image: /boot/vmlinuz-5.11.22-5-pve
Found initrd image: /boot/initrd.img-5.11.22-5-pve
Found linux image: /boot/vmlinuz-5.11.22-4-pve
Found initrd image: /boot/initrd.img-5.11.22-4-pve
Found memtest86+ image: /boot/memtest86+.bin
Found memtest86+ multiboot image: /boot/memtest86+_multiboot.bin
done

root@pve:~# update-grub
Generating grub configuration file ...
Found linux image: /boot/vmlinuz-5.15.53-1-pve
Found initrd image: /boot/initrd.img-5.15.53-1-pve
Found linux image: /boot/vmlinuz-5.15.30-2-pve
Found initrd image: /boot/initrd.img-5.15.30-2-pve
Found memtest86+ image: /boot/memtest86+.bin
Found memtest86+ multiboot image: /boot/memtest86+_multiboot.bin
Warning: os-prober will not be executed to detect other bootable partitions.
Systems on them will not be added to the GRUB boot configuration.
Check GRUB_DISABLE_OS_PROBER documentation entry.

# 检查 iommu 配置可生效
dmesg | grep -e DMAR -e IOMMU
```

1. 更新内核
```sh 
nano /etc/modules

vfio
vfio_iommu_type1
vfio_pci
vfio_virqfd


root@pve:~# update-initramfs -u
update-initramfs: Generating /boot/initrd.img-5.15.53-1-pve
Running hook script 'zz-proxmox-boot'..
Re-executing '/etc/kernel/postinst.d/zz-proxmox-boot' in new private mount namespace..
No /etc/kernel/proxmox-boot-uuids found, skipping ESP sync.
```

2. 重启上来之后检查模块是否正常加载：

```sh 

root@pve:~# lsmod | grep vfio
vfio_pci               57344  1
vfio_virqfd            16384  1 vfio_pci
irqbypass              16384  11 vfio_pci,kvm
vfio_iommu_type1       36864  1
vfio                   36864  5 vfio_iommu_type1,vfio_pci

root@pve:~# lspci -nn | grep NV
01:00.0 3D controller [0302]: NVIDIA Corporation GF117M [GeForce 610M/710M/810M/820M / GT 620M/625M/630M/720M] [10de:1140] (rev a1)
root@pve:~# lspci -n -s 01:00.0
01:00.0 0302: 10de:1140 (rev a1)

echo "options vfio-pci ids=10de:1140" > /etc/modprobe.d/vfio.conf

root@pve:~# dmesg | grep -e DMAR -e IOMMU
[    0.061783] DMAR: IOMMU enabled
[   10.890533] AMD-Vi: AMD IOMMUv2 driver by Joerg Roedel <jroedel@suse.de>
[   10.890536] AMD-Vi: AMD IOMMUv2 functionality not available on this system
```

3. 让PCI-e设备的资源直接分配给虚拟机，即 PCI直通
   1. VT-d 全称为 Intel® Virtualization Technology for Directed I/O
   2. IOMMU 全称为 Input/Output Memory Management Unit
   3. `dmesg | grep DMAR` 检查是否开启
      - [    0.002000] DMAR-IR: Enabled IRQ remapping in x2apic mode //输出 

4. windows 
   1. 推荐设置为UEFI而不是默认的SeaBIOS
   2. “SSD仿真”，如果使用的就是PVE硬盘，则强烈推荐勾选该选项，可以大幅度提升磁盘读写效率（图30）。
   3. 务必勾选“启用NUMA”项，另外处理器的类别也设置为“host”
   4. “VirlO（半虚拟化）”
   5. 