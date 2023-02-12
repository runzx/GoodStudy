# Windows 中的硬链接和软链接

1. cmd
2. 硬链接的优点：

- 兼容性好
- 盘符被更改也不会受影响
- 无需管理员的权限

3. 硬链接的缺点：

- 必须在同一个分区
- 仅支持本地驱动器
- 不支持为文件夹创建硬链接

4. Symbolic Link 又被叫做符号链接和 Soft Link（软链接）
5. Vista 之后才有的，可以说是 Junction 链接的增强版，软连接可以支持任何路径，包括文件和不存在的路径，支持相对路径，支持跨文件系统。
6. rmdir 删除虚拟链接目录，并不会删除真实文件，注意，不能使用 del 命令，del 命令会删除真实文件

```sh
# 软连接
mklink /D "C:\zx\pnpm\bin\nodejs\16.19.0" "c:\zx\pnpm\bin\node.exe"

# rmdir 删除链接名称
rmdir d:\recivefiles
rmdir d:\develop
```

7. 初级软链接 Junction `mklink /J`
   1. 链接的优点：

- 兼容性还好
- 支持文件夹操作
- 支持跨分区
- 无需管理员权限

  2. Junction 链接的缺点：
     - 不支持相对路径
     - 盘符被更改会受影响 \
     - 不可指向文件/远程 SMB 网络路径
