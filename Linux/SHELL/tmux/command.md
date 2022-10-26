# tmux 常用命令
1. 输入前缀，默认为 Ctrl + b 该操作被定义为 Prefix。
2. 每个 session 会话中，您可以开启多个窗口和面板
3. 普通 Terminal 页面中
   1. `tmux ls` 查看所有的 Tmux 会话

   2. `tmux kill-session -t [session-name]` 删除指定会话
   3. `tmux kill-server` 删除所有会话
   4. `tmux switch -t <session-name>` 切换会话
   5. `tmux rename-session -t 0 <new-name>` 重命名会话

4. 左下方的 0:bash 即第一个窗口，1:bash 为第二个窗口

```sh
# 会新建一个窗口
Prefix c 
# 选择窗口
Prefix 1 # 转到第1个窗口
Prefix p/n # 前/后一个窗口
# 关闭窗口
Prefix &
# 列出所有窗口（包含其他Session）
Prefix w 
# 搜索窗口
Prefix f
# 重命名当前窗口
Prefix ,

# 退出 Tmux，并保存当前会话，此时 Tmux 仍在后台运行，可以通过 Tmux attach 进入指定的会话
Prefix d
```

5. 窗格管理

```sh
# 新建一个水平窗格
Prefix %	
# 新建一个垂直窗格
Prefix " # "
# 关闭窗格
Prefix x
# 在窗格间切换
Prefix o 
# 显示窗格编号
Prefix q
# 切换到新窗口
Prefix ！
# 窗格交换位置
Prefix + {/}
```
