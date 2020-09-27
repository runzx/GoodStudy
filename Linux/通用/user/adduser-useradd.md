## useradd 在debian,ubuntu没有home目录

###  De­bian 或 Ubuntu ，主要的区别在使用方式上
adduser是一个 perl 脚本，通过交互式菜单设定一些用户参数。  
在输入adduser 用户名后，会自动创建用户主目录（并复制/etc/skel目录下的文件）、指定系统 shell，提示输入用户密码，很简单的就添加了一个标准的普通用户  

useradd是一个指令，如果不使用任何选项，创建的用户将无密码、无主目录、没有指定 shell。  
如果你需要正常使用这个账户，就还需要设置密码、创建家目录等额外操作。
`useradd -m -s /bin/bash zhaixiang`  
-m 自动创建用户的home目录，并将/etc/skel中的文件复制到家目录中  
-s 指定用户登入后所使用的 shell  
### centos
没有区别的, adduser 通过符号链接指向 useradd

### del user
`pkill -u zx`  // 终结用户进程
`userdel -r zx` // -r 表示删除用户的同时，将其宿主目录和系统内与其相关的内容删除  

### centOS 中2个命令相同
passwd zhaixiang  
vi /etc/sudoers  
  [用户名]    ALL=(ALL)    ALL  
  （如需新用户使用sudo时不用输密码，把最后一个ALL改为NOPASSWD:ALL即可）  

zhaixiang		ALL=(ALL)	NOPASSWD: ALL  