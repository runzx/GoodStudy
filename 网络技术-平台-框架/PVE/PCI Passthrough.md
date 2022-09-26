# PCI Passthrough 直通
1. PCI Express 总线直接访问物理设备，例如网络端口、WiFi 卡、存储设备、GPU 等
2. 直通后不能被别的虚拟机使用
3. 必须启用 IOMMU 才能使 PCI Passthrough 工作


## 启用 IOMMU
1. https://pve.proxmox.com/wiki/Pci_passthrough
```sh
nano /etc/default/grub
# 添加
GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on"

update-grub

vim /etc/modules

#修改为
vfio
vfio_iommu_type1
vfio_pci
vfio_virqfd

#最后重启
reboot 
```
2. 首先使用 OVMF (UEFI) BIOS 安装 VM
   - OVMF (UEFI) 和 q35 机器类型对于使用 Protectli Vaults 进行 PCI 直通具有最高的成功率。 
3. WiFi模块:  展开advanced选项并启用ROM-Bar和PCI-Express选项
4. 安装openmediavault，需直通sata控制器，这样可以对sata硬盘进行高级电源管理(可自动休眠）,并可监控S.M.A.R.T信息
5. win10: 直通键鼠(usb0),显卡(hostpci0,hostpci1) 
   1. 使用 OVMF/UEFI/q35/pcie 方式
   2. hostpci0的主GPU(x-vga=1)若打开，则会关闭vnc连接。可以先关了以便于调试：待vnc连入win10桌面后打开远程桌面连接后在开。
### AMD
```sh
#AMD用户修改为
GRUB_CMDLINE_LINUX_DEFAULT="quiet amd_iommu=on pcie_acs_override=downstream,multifunction video=vesafb:off video=efifb:off"
#efifb:off 禁用efi启动的显示设备
#vesafb:off 禁用vesa启动的显示设备

# 开启显卡直通(适用于A卡，独显)
# 查找自己的显卡及其HDMI音频模块的device id
lspci -nn | grep Radeon
# 输出示例(视具体情况而定)
08:00.0 VGA compatible controller [0300]: Advanced Micro Devices, Inc. [AMD/ATI] Baffin [Radeon RX 460/560D / Pro 450/455/460/555/555X/560/560X] [1002:67ef] (rev cf)
08:00.1 Audio device [0403]: Advanced Micro Devices, Inc. [AMD/ATI] Baffin HDMI/DP Audio [Radeon RX 550 640SP / RX 560/560X] [1002:aae0]

#从而获知是1002:67ef,1002:aae0(视具体情况而定), 修改vfio.conf
echo "options vfio-pci ids=1002:67ef,1002:aae0  disable_vga=1" > /etc/modprobe.d/vfio.conf

#修改blacklist.conf,禁用驱动
vim /etc/modprobe.d/blacklist.conf
#修改为
blacklist nouveau
blacklist radeon
blacklist nvidia

#修改kvm.conf
vim /etc/modprobe.d/kvm.conf 
# 修改为
options kvm ignore_msrs=1

#更新initramfs并重启
update-initramfs -u
reboot
```
6. acs补丁开启后
   1. SATA controller会被单独分组
   2. ACS补丁的作用是细化IOMMU分组