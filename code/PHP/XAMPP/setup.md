# XAMPP setup

1. Xdebug
   1. 先检查下自己的 XAMPP 的目录 xampp\php\ext 下是不是有 php_xdebug.dll
   2. xampp\php 下面的 php.ini

```conf
[Xdebug]
zend_extension="D:\xampp\php\ext\php_xdebug.dll"
xdebug.remote_enable=1
xdebug.remote_handler=dbgp
xdebug.remote_mode=req
xdebug.remote_host=localhost
xdebug.remote_port=9000
xdebug.idekey="PHPSTORM"
```

2. 重启服务器 apache_stop.bat -> apache_start.bat
3. 没有 php_xdebug.dll
   1. phpinfo() 复制网页源代码
   2. 粘贴到https://xdebug.org/wizard的文本框内
   3. 按照指南，下载对应的版本，并安装到对应的目录下。
      继续配置 xampp\php 下面的 php.ini
