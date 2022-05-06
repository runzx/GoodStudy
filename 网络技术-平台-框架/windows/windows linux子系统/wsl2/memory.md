# 限制wsl2占用过多内存
1. 重启wsl2
   1. wsl --shutdown
2. 限制wsl2内存使用
   1. `%UserProfile%\.wslconfig`

```conf
 [wsl2]
 processors=8
 memory=8GB
 swap=8GB
 localhostForwarding=true
```
3. 定期释放cache内存
   1. `echo 3 > /proc/sys/vm/drop_caches`