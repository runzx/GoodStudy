# start

`yum install vixie-cron`  
`yum install crontabs`  
`sudo service cron start`

0. 默认配置了调度任务 hourly、daily、weekly、mouthly,默认配置文件为/etc/anacrontab;将需要执行的脚本放到相应的目录下即可:

```
/etc/cron.hourly
/etc/cron.daily
/etc/cron.weekly
/ect/cron.mouthly
```

1. 每次编辑完某个用户的 cron 设置后，cron 自动在/var/spool/cron 下生成一个与此用户同名的文件,只可以用 crontab -e 来编辑

```
*     * 　 *　  *　  *　　command
分　  时　 日　 月　 周　  命令
'/'代表每的意思,'*/5'表示每5个单位
'-'代表从某个数字到某个数字,','分开几个离散的数字
0表示星期天
0 11 4 * mon-wed /usr/local/etc/rc.d/apache restart #每月的4号与每周一到周三的11点重启apache
```

2. cron 会每分钟查看上面的配置文件，所以修改此文件不用重启
3. cron 配置文件/etc/crontab

```
SHELL=/bin/bash
PATH=/sbin:/bin:/usr/sbin:/usr/bin
MAILTO=root
HOME=/
# run-parts
01 * * * * root run-parts /etc/cron.hourly
02 4 * * * root run-parts /etc/cron.daily
22 4 * * 0 root run-parts /etc/cron.weekly
42 4 1 * * root run-parts /etc/cron.monthly
```

4. service crond status

## &

1. cp $filename /dev/ & 代表非阻塞方式拷贝文件  
   如果不加& 则必须等到执行完该指令后才能执行后来的指令  
   & 放在启动参数后面表示设置此进程为后台进程
2. 0,1,2 标准输入，标准输出，错误输出 2>&1 错误输出转到标准输出

3. tail -f xx.log // 当文件增长时,输出后续添加的数据;
