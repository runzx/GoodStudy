1. 显示所有进程信息，连同命令行

- ps -ef
- 与 grep 常用组合用法，查找特定进程
  - ps -ef | grep sslocal

2. kill

- kill[参数][进程号]
- kill -9 pid 号 强行 kill

2. ps 参数

- a 显示所有进程
- -a 显示同一终端下的所有程序
- -A 显示所有进程
- c 显示进程的真实名称
- -N 反向选择
- -e 等于“-A”
- e 显示环境变量
- f 显示程序间的关系
- -H 显示树状结构
- r 显示当前终端的进程
- T 显示当前终端的所有程序
- u 指定用户的所有进程
- -au 显示较详细的资讯
- -aux 显示所有包含其他使用者的行程
- -C<命令> 列出指定命令的状况
- --lines<行数> 每页显示的行数
- --width<字符数> 每页显示的字符数
- --help 显示帮助信息
- --version 显示版本显示

4. kill 参数

- HUP 1 终端断线
- INT 2 中断（同 Ctrl + C）
- QUIT 3 退出（同 Ctrl + \）
- TERM 15 终止
- KILL 9 强制终止
- CONT 18 继续（与 STOP 相反， fg/bg 命令）
- STOP 19 暂停（同 Ctrl + Z）

5. 批量 kill
   - ps -ef|grep java|awd '{print $2}'| xargs kill -9
