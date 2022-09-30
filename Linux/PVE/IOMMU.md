# iommu
1. Intel VT-d 和 AMD-Vi 的通用名称
2. VT-d 指的是直接输入/输出虚拟化(Intel Virtualization Technology for Directed I/O)

```sh
nano /etc/default/grub

GRUB_CMDLINE_LINUX_DEFAULT="quiet intel_iommu=on iommu=pt pcie_acs_override=downstream video=efifb:off"
# iommu=pt：pt 是 passthrough 的缩写，可以提高性能
# pcie_acs_override=downstream: 可以将同一 Group 中的设备分开直通
# video=efifb:off：禁用 efifb 驱动，防止出现报错 BAR 3: cannot reserve [mem]

# 更新内核参数
update-grub

# 隔离 GPU
nano /etc/modules 

vfio
vfio_iommu_type1
vfio_pci
vfio_virqfd

nano /etc/modprobe.d/vfio.conf 
#  将显卡的供应商-设备 ID 传递给 vfio 驱动
# 供应商-设备 ID 可以在上面脚本的输出的 [] 中找到，多个设备用 , 分隔
options vfio-pci ids=device_id1,device_id2 disable_vga=1

# 在 PVE 宿主机的中禁用其他显卡驱动，防止这些驱动在 vfio 前加载
nano /etc/modprobe.d/blacklist.conf

# NVIDIA
blacklist nvidiafb
blacklist nouveau
blacklist nvidia
blacklist snd_hda_intel

# Intel
blacklist snd_hda_codec_hdmi
blacklist i915

# AMD
blacklist radeon

# 更改并重启
update-initramfs -u
reboot

# 分配显卡
# 1. 选择添加 PCI 设备
# 直通 UHD630 只需要勾选 全功能（All Functions）
# 直通 AMD RX460 除了 主 GPU（Primary GPU） 外的选项都需要勾选

# 直通之后 PVE 自带的 VNC 可能会卡在白苹果界面，其实系统已经正常启动，可以使用 MacOS 自带的 VNC 进行连接
```
