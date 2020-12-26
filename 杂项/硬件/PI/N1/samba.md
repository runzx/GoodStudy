## 
[zhaixiang]
        comment = Storage
        path = /home/zhaixiang
        writable = yes
        public = no
        valid users = zhaixiang
        force create mode = 0644


`smbpasswd -a zhaixiang`  添加密码  
`service smbd restart`    