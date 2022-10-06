# 改变分区尺寸
1. cfdisk
   1. `sudo cfdisk /dev/nvme0n1`  // 是 `0`
   2. 分区扩展只能连续空间，要删除旁边的分区才能扩展
   3. 改size 后 要 write 并 yes 才生效