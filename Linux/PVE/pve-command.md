# pve 命令
1. `qm start 100` 启动 100 虚拟机

## 直通后返回
```sh
# 复制perl脚本至snippets目录
mkdir /var/lib/vz/snippets
cp hooks-igpupt.pl /var/lib/vz/snippets/hooks-igpupt.pl

# 将钩子脚本应用至虚拟机
qm set <VMID> --hookscript local:snippets/hooks-igpupt.pl


# PVE模板文件进行对比 /usr/share/pve-docs/examples/guest-example-hookscript.pl
```