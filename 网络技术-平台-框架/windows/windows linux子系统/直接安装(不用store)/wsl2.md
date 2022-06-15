# stup wsl2 Ubuntu
0. https://docs.microsoft.com/en-us/windows/wsl/install-manual#step-6---install-your-linux-distribution-of-choice
1. 
2. 启用虚拟机功能 `dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart`
3. `https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi`
4. reboot
5. `wsl --set-default-version 2`
6. `wsl --import Ubuntu d:\ubuntu_dir  d:\ubuntu.tar --version 2  // WSL2` 导入已备份的包
7. wsl 启动


# WSL
1. 开启wsl
2. `https://aka.ms/wslubuntu2004` 下载
3. `Add-AppxPackage .\wslubuntu2004.appx`    // powerShell 管理员权限
   1.  wsl --import Ubuntu c:\tools\wsl  codeingWSLubuntu-wsl2-v20-20220423.tar     // 导入方式 恢复
   2.  wsl --set-default Ubuntu 
   3.  wsl  // 启动
5. wsl -l
6. `\\wsl$`