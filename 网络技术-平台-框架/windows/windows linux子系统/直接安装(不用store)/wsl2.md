# stup wsl2 Ubuntu

1. 启用虚拟机功能 `dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart`
2. `https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi`
3. reboot
4. `wsl --set-default-version 2`
5. `wsl --import Ubuntu d:\ubuntu_dir  d:\ubuntu.tar --version 2  // WSL2` 导入已备份的包
6. wsl 启动

