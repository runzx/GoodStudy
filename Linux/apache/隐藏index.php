在APACHE服务器上的访问方式上去除index.php
 
1.httpd.conf配置文件中加载了mod_rewrite.so模块 //在APACHE里面去配置 
    #LoadModule rewrite_module modules/mod_rewrite.so把前面的警号去掉 
2.在APACHE里面去配置 ，将虚拟机里面的
    AllowOverride None都改为AllowOverride All
    注意：修改之后一定要重启apache服务。 
3.确保URL_MODEL设置为2， (url重写模式)
    在项目的配置文件里写 
        return Array( 
            ‘URL_MODEL’ => ’2′, 
        ); 
4 .htaccess文件必须放到跟目录下 
    这个文件里面加： 
        RewriteEngine on 
        RewriteCond %{REQUEST_FILENAME} !-d 
        RewriteCond %{REQUEST_FILENAME} !-f 
        RewriteRule ^(.*)$ index.php/$1 [L] 