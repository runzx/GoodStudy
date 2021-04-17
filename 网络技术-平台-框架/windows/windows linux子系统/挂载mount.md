# mount

1. 使用 DrvFs 文件系统手动安装 Windows 驱动器。
   为了促进与 Windows 的互操作性，WSL 使用 DrvFs 文件系统。WSL 自动将支持文件系统的所有固定驱动器安装在`/mnt`下，例如`/mnt/c，/mnt/d` 等。目前，仅支持`NTFS`和 `ReFS`卷。

   比如网络共享  
   `mount -t drvfs '\\ser\share' /mnt/share`  
    请注意`UNC`路径的单引号; 这些都是必要的，以防止需要避开反斜杠。  
    不用单引号括住`UNC`路径，则需要通过加倍反斜杠（例如 `\\\\server\\share`）来避开反斜杠。  
    WSL 没有任何方法来指定使用哪个凭证连接到网络共享。如果您需要使用不同的凭据连接到服务器，请在 Windows 中通过导航到文件资源管理器中的共享，使用 Windows 凭据管理器或 `net use` 命令来指定它们。

   NTFS 文件夹  
   `mount -t devfs 'c:\Users' /mnt/users`

   挂载 D 盘  
   `sudo mount -t drvfs D: /mnt/d`

   现在要在 WSL 中挂载这样一个卷，只需使用到挂载点的路径即可：  
   `$ sudo mount -t drvfs 'C:\mountpoint' /mnt/myvolume`

   例如，FAT 文件系统不区分大小写，不支持硬链接或符号链接。  
    使用网络文件系统，DrvFs 不会在文件上设置正确的 Linux 权限位;  
    相反，所有文件都以完全访问（0777）报告，唯一的方法来确定您是否可以实际访问该文件是试图打开它。  
    网络文件系统也不区分大小写，不支持符号链接。

2. 要挂载 EXT2,3,4 分区或设备  
   通过`ext2fsd`在`windows`里识别  
   ext2,3 可读写，  
   ext4 能读（写可能会有小 bug）,  
   在 WSL 里再加载`http://www.ext2fsd.com/`  
   支持的 Ext3 / 4 功能：  
    1，灵活的 inode 大小：> 128 个字节，最大为块大小  
    2，dir_index：htree 目录索引  
    3，文件类型：dentry 中的额外文件模式  
    4，large_file：>支持 4G 文件  
    5，sparse_super：组描述符中的超级块备份  
    6，uninit_bg：快速 fsck 和组校验和  
    7，程度：充分支持与扩大和缩小。 // extent: full support with extending and shrinking.  
    8，期刊：只支持内部期刊的重播 // journal: only support replay for internal journal  
    9，flex_bg：第一个灵活的元数据组
   10，符号链接和硬链接  
    11，安装为用户：指定的 uid / gid 支持  
    不受支持的 Ext3 / 4 功能：  
    1，64BIT 模式（支持 2 ^ 64 块）  
    2，日志：基于日志的操作，外部日志  
    3，EA（扩展属性），ACL 支持
