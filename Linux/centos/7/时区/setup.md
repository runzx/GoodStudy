## centos7查看修改时区

`timedatectl` 查看  
`timedatectl list-timezones` 列出所有时区  
`timedatectl set-local-rtc 1` 将硬件时钟调整为与本地时钟一致, 0 为设置为 UTC 时间  
`timedatectl set-timezone Asia/Shanghai` 设置系统时区为上海  

`pm2 update` 才能log用新时区时间  
