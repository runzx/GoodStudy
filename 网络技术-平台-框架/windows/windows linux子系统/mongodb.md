# 报错 directory-sync: fdatasync: Invalid argument.

1. mongodb3.0 版本以上默认使用 wiredTiger 引擎，但是挂载卷不支持这个引擎，所以启动时更换默认的引擎即可，可采用指定引擎为 mmapv1。命令行如下： `-storageEngine=mmapv1`
