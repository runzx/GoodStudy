# cron

1. linux pm2 fork 模式是自动重启，cluster 不会重启

```
exec_mode: "cluster",
max_memory_restart: '1024M',  // 超过内存数 重启
cron_restart: '* */1 * * *',  // 定时重启 每1小时
restart_delay: 20 * 1000,     // 重启延时 20s
autorestart: true,            // 程序崩溃后自动重启
```
