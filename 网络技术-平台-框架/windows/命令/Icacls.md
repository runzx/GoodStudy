# Icacls

1. ` icacls filename /reset` 文件继承来自文件夹默认ACL
2. `icacls c:\temp\Test /t /e /g zhaixiang:f` f 完全控制权限  
   /T——更改当前目录及其所有子目录中指定文件的ACL；
    /E—— 编辑ACL 而不替换；
    /G user:perm——赋予指定用户访问权限。Perm可以是R（读取）、W（写入）、C（更改，写入）、F （完全控制）；