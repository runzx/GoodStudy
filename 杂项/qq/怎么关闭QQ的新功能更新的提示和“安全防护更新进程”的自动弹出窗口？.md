# 怎么关闭QQ的新功能更新的提示和“安全防护更新进程”的自动弹出窗口？

1. gpedit.msc  
2. 计算机配置--windows设置--安装设置--软件限制策略--其它规则--新建哈希规则
C:\Program Files (x86)\Tencent\QQ\txupd.exe  
C:\Program Files (x86)\Common Files\Tencent\QQProtect\Bin\QQProtectUpd.exe  
C:\ProgramData\Tencent\QQProtect\SelfAuTemp_DeepBoy\NewFile\QQProtectUpd.exe 

设置 不允许  