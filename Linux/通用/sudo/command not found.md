# sudo: command not found
1. 处于安全的考虑，这个程序将在一个新的、最小化的环境中执行
2. PATH这样的环境变量，在 sudo 命令下已经被重置成默认状态
3. `vi /etc/sudoers`
   1. secure_path 添加 路径: `/usr/local/bin/`