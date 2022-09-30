# install aplle MAC
1. mb bios setup vms,svn, VT-d
2. UEFI 对直通好些
3. install CT ubuntu 18.4
   1. update sources.list
   2. install git
   3. git clone https://github.com/thenickdude/OSX-KVM.git
   4. cd OSX_KVM/scripts/monterdy
   5. make Monterey-recovery.img
   6. `pct pull 100 /root/OSX-KVM/scripts/monterty/Monterey-recovery.img /var/lib/vz/template/ios/Monterey-recovery.img` // 编译好的模版 拷贝到宿主机
      1. `pct pull 103 /home/zhaixiang/OSX-KVM/BaseSystem.img monterey-recovery.img /var/lib/vz/template/ios/monterey-recovery.img`
   7. wget https://github.com/thenickdude/KVM-Opencore/releases/download/v15/OpenCore-v15.ios.gz
      1. 硬盘映像 v17 cpu 4th+
   8. gzip -d OpenCore-v15.iso.gz
4. install VM use OpenCore.iso
   1. VMWare 显卡, Q35, Qemu agent, 
   2. 去掉 Pre-Enroll Keys, 
   3. hd VirtIO Block, Wreite back, 100G
   4. cpu 2次幂，Penryn, Numa
   5. lan VirtIO
   6. 以cd-rom 添加 Monterey-recovery.img

```sh
nano /etc/pve/qemu-server/101.conf
# 添加 
# intel cpu
args: -device isa-applesmc,osk="ourhardworkbythesewordsguardedpleasedontsteal(c)AppleComputerInc" -smbios type=2 -device usb-kbd,bus=ehci.0,port=2 -global nec-usb-xhci.msi=off -global ICH9-LPC.acpi-pci-hotplug-with-bridge-support=off -cpu Haswell,vendor=GenuineIntel,+kvm_pv_eoi,+kvm_pv_unhalt,+hypervisor,+invtsc,kvm=on

# 此处添加了 USB 键盘，因为 macOS 不支持 QEMU 的默认 PS/2 键盘。
# 已禁用 MSI，以便 USB 控制器修复 USB 3 设备通过时 QEMU 死机。
# 已禁用 ACPI PCIe 热插拔支持，以修复具有直通设备的虚拟机。
# host CPU is AMD
-cpu Penryn,kvm=on,vendor=GenuineIntel,+kvm_pv_unhalt,+kvm_pv_eoi,+hypervisor,+invtsc,+pcid,+ssse3,+sse4.2,+popcnt,+avx,+avx2,+aes,+fma,+fma4,+bmi1,+bmi2,+xsave,+xsaveopt,+rdrand,check

# ide0,ide1 media=cdrom 改成 cache=unsafe Mac视为硬盘而不是DVD驱动器

# 启动顺序以将 IDE2（OpenCore 映像）放在第一位
boot: order=ide2;virtio0


# 避免在 macOS 启动期间出现引导循环
echo "options kvm ignore_msrs=Y" >> /etc/modprobe.d/kvm.conf && update-initramfs -k all -u


# 安装的第一阶段后，VM 将快速连续重新启动 2 或 3 次，每次都必须手动选择 'macOS Installer' 条目

# 安装已接近完成，'macOS Installer' 条目消失了，因此请选择要启动的主磁盘的名称（我的称为Main）

# 接下来还有一次重启。之后再次选择“主要”条目，这次你终于可以进入蒙特雷了！

# 在打开核心中配置了 Mac 的序列号之前，您需要推迟登录苹果 ID（因为否则，在我的 OpenCore 映像中具有默认共享序列号的 Mac 将被添加到您的苹果 ID 中）。

# 在系统执行内务管理任务时，在首次启动后的几分钟内，它将非常缓慢。
```

5. 删除 monterey-recovery.img cdrom
6. 在mac terminal
   1. diskutil list
      1. disk2 opencore 镜像盘
      2. disk0 安装系统的虚拟hd
      3. 把 disk2s1 覆盖到 disk0s1 (EFI 部分)
         1. sudo dd if=/dev/disk2s1 of/dev/disk0s1

7. auto 启动mac
   1. ProperTree github.com
   2. install py 3.1
   3. sudo diskutil mount disk0s1 加载EFI分区
   4. showpicker -> false

## 直通 显卡

1. bios 关闭 Abve 4G decodeing; 打开 VT-d
2. iommu 
3. 5000,6000可直接配置openCroe
   1. EFI mount
   2. OC -> NVRAM add boot-args -> keepsyms=1 -v agdpmod=pikera
   3. shutdown 
   4. 显示 -> 无； 添加 PCI
      1. 所有功能； 主GPU； PCI-Express
      2. 直通 usb mouse，keyBord

## openCore v17

1. Haswell 是英特尔开发的处理器微架构的代号, 作为 Ivy Bridge 常春藤桥的“第四代内核”, 	22 nm, 英特尔于2013年6月4日
2. Haswell CPU 与英特尔 8 系列芯片组、英特尔 9 系列芯片组和英特尔 C220 系列芯片组结合使用
3. 2022年，至少有一款基于Haswell的处理器仍在销售，奔腾G3420。
4. Penryn  2007/2008 年“Tick 滴答”的英特尔代号，该循环将 Merom 缩小到 45 纳米，如酷睿 2 单核

### 
1. https://github.com/thenickdude/OSX-KVM
2. https://www.nicksherlock.com/2022/06/installing-macos-13-ventura-developer-beta-on-proxmox-7-2/#more-1293

### log
1. host i5-2320 CPU @ 3.00GHz 16G内存 
2. install 14:20 -> 14:50 第一阶段  `macOS Monterey`
3. 14:50 -> 第二阶段 15:50 `macOS Installer` cpu 10+