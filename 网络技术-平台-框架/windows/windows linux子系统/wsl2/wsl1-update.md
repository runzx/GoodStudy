<!--
 * @Author: zhaix
 * @Date: 2022-04-10 09:00:11
 * @LastEditTime: 2022-04-12 21:26:55
 * @LastEditors: Do not edit
 * @FilePath: \goodstudy\网络技术-平台-框架\windows\windows linux子系统\wsl2\wsl1-update.md
 * @Description:
-->

# wsl1 update

1. 环境准备:
   1. 开启 WSL
      1. PowerShell: `dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart`
   2. 启用虚拟机功能 `dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart`
   3. reboot
2. 下载 Linux 内核更新包: `https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi`
3. wsl2 设为默认版本 `wsl --set-default-version 2`
4. 升级 `wsl --set-version <distribution name> <versionNumber>`
   1. wsl --set-version Debian 2
   2. Linux DESKTOP-6S99M96 5.10.16.3-microsoft-standard-WSL2 ...

5. 直接安装 
   1. `https://aka.ms/wslubuntu`
   2. `Add-AppxPackage .\app_name.appx`
      1. download
         1. `Invoke-WebRequest -Uri https://aka.ms/wslubuntu2004 -OutFile Ubuntu.appx -UseBasicParsing`
         2. `curl.exe -L -o ubuntu-2004.appx https://aka.ms/wslubuntu2004`
6. Installing, this may take a few minutes… WslRegisterDistribution
failed with error: 0x800701bc Error: 0x800701bc WSL 2 ???
  - 重新安装 `wsl_update_x64.msi`

7. mirrors
   1. `mv /etc/apt/sources.list /etc/apt/sources.list-zx`
   2. sudo nano /etc/apt/sources.list