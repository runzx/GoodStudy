# MinGW-W64 安装

1. MinGW-W64 是目前 Windows 系统下最好的 GNU C/C++编译工具链
2. msys2 官方下载: `https://repo.msys2.org/distrib/`
3. 64 位系统请使用`msys2-x86_64-latest.exe`,32 位 windows 系统请使用`msys2-i686-latest.exe`
4. 清华镜像:
   1. `https://mirror.tuna.tsinghua.edu.cn/msys2/distrib/`
   2. `https://mirrors.aliyun.com/msys2/`
5. 安装完毕后，打开 msys2 的安装文件夹，找到并运行 msys2.exe，进入 msys shell
6. pacman 来安装和管理软件
   1. `pacman -Sl`，可以列出 msys2 官方库中的的所有软件
   2. `pacman -Q`，可以列出当前安装的 所有软件
   3. `pacman -S` 软件名，可以安装相应的软件
   4. `pacman -R` 软件名，可以移除相关的软件
   5. `pacman -Syu`，可以升级所有的软件
7. 安装基本的 gcc 编译环境（32 位）
   1. `pacman -S mingw-w64-i686-gcc mingw-w64-i686-gdb mingw-w64-i686-make`
8. 安装基本的 gcc 编译环境(64 位）
   1. `pacman -S mingw-w64-x86_64-gcc mingw-w64-x86_64-gdb mingw-w64-x86_64-make`
9. path: 'C:\msys64\mingw64\bin'
10. 镜像源
    1. etc/pacman.d
    2. mirrorlist.msys、mirrorlist.mingw32、mirrorlist.mingw64 增加下面到最前面
    3. `Server = https://mirrors.tuna.tsinghua.edu.cn/msys2/msys/$arch/`
    4. `Server = https://mirrors.aliyun.com/msys2/msys/$arch/`
