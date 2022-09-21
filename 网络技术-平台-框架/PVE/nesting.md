# nesting 嵌套

1. 可以在 PVE 的虚拟机中再开启虚拟机 (docker?)
2. PVE 虚拟出来的 vm 系统的 cpu,默认不支持 vmx，即不支持嵌套虚拟化
3. 命令来验证：`egrep --color 'vmx|svm' /proc/cpuinfo`

   1. 没有输出即不支持，否则会高亮显示 vmx 或者 svm。

4. `cat /sys/module/kvm_intel/parameters/nested` -> Y 开启了 vmx
   1. 开启方法： 必须关闭所有的虚拟机系统
   2. `modprobe -r kvm_intel`
   3. `modprobe kvm_intel nested=1`
5. 设置系统启动后自动开启 nested
   1. `echo"options kvm_intel nested=1">> /etc/modprobe.d/modprobe.conf`
