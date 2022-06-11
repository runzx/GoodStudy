# ps

1. 
```sh
# ps -ef
UID        PID  PPID  C STIME TTY          TIME CMD

UID   代表执行者身份
PID   进程的ID号
PPID  父进程的ID
C     CPU使用的资源百分比
STIME 进程的启动时间
TTY   登入者的终端机位置

TIME  使用掉的 CPU 时间
CMD   所下达的指令名称

# ps -aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND

%CPU：进程CPU的占用率
%MEM：进程物理内存的占用率

VSZ ：进程占用的虚拟内存量 (KB)
RSS ：进程当前实际上占用了多少内存 KB
STAT：该程序目前的状态
      R ：运行
      D：不可中断：一般是IO进程
      S ：中断；该程序目前正在睡眠当中 (可说是 idle 状态)，但可被某些讯号 (signal) 唤醒
      T ：停止：该程序目前正在侦测或者是停止了
      Z ：僵尸：该程序应该已经终止，但是其父程序却无法正常的终止他
      
        l	多线程状态
        <	优先级高的进程
        +	前台进程

```