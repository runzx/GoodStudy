# sudo: command not found 的解决方法
1. env

```sh
vi /etc/sudoers
# 找到"secure_path"一行，当你执行 sudo 命令时，"secure_path"中包含的路径将被当做默认 PATH 变量使用。

Defaults        secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin:"
# zhaixiang user
/home/zhaixiang/.local/share/pnpm:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin

```