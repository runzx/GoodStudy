# cgroup

1. setup: `apt install cgroup-tools`

```
cgroup-bin/oldstable 0.41-8.1 all
  control and monitor control groups (transitional package)

cgroup-tools/oldstable 0.41-8.1 amd64
  control and monitor control groups (tools)

cgroupfs-mount/oldstable 1.4 all
  Light-weight package to set up cgroupfs mounts

libcgroup1/oldstable 0.41-8.1 amd64
  control and monitor control groups (library)
```

2. `df -h`

- tmpfs 2.0G 0 2.0G 0% /sys/fs/cgroup

3.  `ls /sys/fs/cgroup`
4.  `systemctl list-unit-files`

- cgroupfs-mount

5. `mount | grep memory`

- cgroup on /sys/fs/cgroup/memory type cgroup (rw,nosuid,nodev,noexec,relatime,memory)

6. `cgcreate`,

- Create control group(s)

7. `cgset`

- Usage is cgset -r <name=value> <relative path to cgroup>
- --copy-from <source_cgroup_path> Control group whose parameters will be copied

8. `cgexec`

- Run the task in given control group(s)

8. ` lssubsys -am` #(-a 代表所有，-m 代表显示挂载点)

## 模块叫 VFS (Virtual File System)

```
$ cgreate -g  memory:/test # 命令行创建控制组群，运行后就会在memory挂载目录下/sys/fs/cgroup/memory/ 目录下看到一个新的目录test，这个就是新创建的memory子控制组群
$ cgdelete -g memory:/test # 运行后就会删除memory的cgroup子控制组test
$ cgset -r cpuset.cpus=0-1 test # 设置cgroup参数
$ cgclassify -g cpuset:/test 871 # 将某个进程移动到cgroup中
$ cgexec -g subsystems:path_to_cgroup command arguments # 启动进程时绑定 cgroup
```

1. subsystem

```
cpu 子系统，主要限制进程的 cpu 使用率。
cpuacct 子系统，可以统计 cgroups 中的进程的 cpu 使用报告。
cpuset 子系统，可以为 cgroups 中的进程分配单独的 cpu 节点或者内存节点。
memory 子系统，可以限制进程的 memory 使用量。
blkio 子系统，可以限制进程的块设备 io。
devices 子系统，可以控制进程能够访问某些设备。
net_cls 子系统，可以标记 cgroups 中进程的网络数据包，然后可以使用 tc 模块（traffic control）对数据包进行控制。
freezer 子系统，可以挂起或者恢复 cgroups 中的进程。
ns 子系统，可以使不同 cgroups 下面的进程使用不同的 namespace。
```

2. 例如，想把 sshd 添加到一个分组中，可以通过如下方式操作。

#cgclassify -g cpu:/test `pidof sshd`

#`cat /sys/fs/cgroup/cpu/test/tasks`

3. 内存

相比来说，内存控制要简单的多，只需要注意物理内存和 SWAP 即可。

- 创建并查看当前的分组

#`cgcreate -g memory:/small`

#`ls /sys/fs/cgroup/memory/small`

- 查看当前值，默认是一个很大很大的值，设置为 1M

#`cat /sys/fs/cgroup/memory/small/memory.limit_in_bytes`

#`cgset -r memory.limit_in_bytes=10485760 small`

- 如果开启了 swap 之后，会发现实际上内存只限制了 RSS，设置时需要确保没有进程在使用

#`cgset -r memory.memsw.limit_in_bytes=104857600 small`

- 启动测试程序

#`cgexec -g cpu:small -g memory:small ./foobar`

#`cgexec -g cpu,memory:small ./foobar`

可以使用 x="a"; while [ true ];do x=$x$x; done; 命令进行测试。

4. Debian, by default, disables the memory controller, we can enable it adding the following in `/etc/default/grub`

- GRUB_CMDLINE_LINUX_DEFAULT="quiet cgroup_enable=memory swapaccount=1"
- `sudo update-grub`
