# turnkey install
1. `https://www.turnkeyLinux.org/mirrors` 选取一个合适的源
2. `https://mirrors.ustc.edu.cn/turnkeyLinux/`
   1. `sed -i 's/mirror.turnkeylinux.org/mirrors.ustc.edu.cn/g' grep -rl 'mirror.turnkeylinux.org' /var/lib/pve-manager/apl-info/` 用前更新(科大的bug)

3. `pveam update` 更新turnkeylinux源
4. `pveam available` 查看可使用的包
