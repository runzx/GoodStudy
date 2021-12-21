# windows setup

## 系统要求

### WSL 2 后端

1. Windows 10 64 位：家庭版，专业版，企业版或教育版 1903 版（内部版本 18362 或更高版本）。
2. 在 Windows 上启用 WSL 2 功能。有关详细说明，请参阅 Microsoft 文档。
3. 要在 Windows 10 上成功运行 WSL 2，需要满足以下硬件先决条件：
   1. 具有二级地址转换（SLAT）的 64 位处理器
   2. 4GB 系统内存
   3. 必须在 BIOS 设置中启用 BIOS 级硬件虚拟化支持。有关更多信息，请参见 虚拟化。
4. 下载并安装 Linux 内核更新程序包。

### Hyper-V 后端和 Windows 容器

1. Windows 10 64 位：专业版，企业版或教育版（内部版本 17134 或更高版本）。
2. 对于 Windows 10 Home，请参阅 WSL 2 后端的系统要求。
3. 必须启用 Hyper-V 和 Containers Windows 功能。
4. 要在 Windows 10 上成功运行 Client Hyper-V，需要满足以下硬件先决条件：
   1. 具有二级地址转换（SLAT）的 64 位处理器
   2. 4GB 系统内存
   3. 必须在 BIOS 设置中启用 BIOS 级硬件虚拟化支持。有关更多信息，请参见 虚拟化。

## WSL1 WSL2

1. WSL 2 架构在几个方面优于 WSL 1，但跨 OS 文件系统的性能除外
2. WSL 2 仅适用于 Windows 10 版本 1903、内部版本 18362 或更高版本
3. Windows 徽标键 + R，检查你的 Windows 版本，然后键入 winver，选择“确定”。
4. 在对压缩的 tarball 进行解包时，WSL 2 的初始版本的运行速度比 WSL 1 快达 20 倍，在各种项目上使用 git 克隆、npm 安装和 cmake 时，大约快 2-5 倍。
5. WSL 2 不支持访问串行端口。
6. WSL 2 作为 hyper-v 虚拟机运行。 这是对 WSL 1 中使用的桥接网络适配器的更改，这意味着 WSL 2 使用网络地址转换 (NAT) 服务作为其虚拟网络，而不是将其桥接到主机网络接口卡 (NIC)，从而生成唯一的将在重启时更改的 IP 地址

## WSL2 vmware

1. WSL2 适用于 VMware 15.5.5+ 和 VirtualBox 6+ 共存
2.
