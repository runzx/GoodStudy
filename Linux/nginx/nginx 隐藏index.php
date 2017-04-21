
1. fastcgi_split_path_info
    就是把参数分割成 $fastcgi_script_name 和 $fastcgi_path_info，分割方式是后面的正则表达式。
    fastcgi_split_path_info ^(.+\.php)(.*)$;
        第一个$fastcgi_script_name变量是变量的值，第二个成为$fastcgi_path_info变量的值
2.
    location / {
        index  index.php index.html index.htm;
        #nginx ignore index.php
        if (!-e $request_filename){
        rewrite ^/(.*) /index.php last;
    }

    location / {
        # yii2 框架的 /site/index?name=sallency&age=25 模式的 rewrite 方法
        try_files $uri $uri/ /index.php$is_args$args;

        # tp 框架的 /site/index/name/sallency/age/25 模式的 rewrite 方法
        try_files $uri $uri/ /index.php/$uri;

        # 虽然 if 不规范但 rewrite 还是很方便的 可以兼容 yii2 和 tp 的 pathinfo 模式
        if (!-e $request_filename){
            rewrite ^/(.*)$ /index.php/$1 last;
            break;
        }
    }
    如果有子目录：
        if (!-e $request_filename) {
            #地址作为将参数rewrite到index.php上。
            rewrite ^/(.*)$ /index.php/$1;

            #若是子目录则使用下面这句，将subdir改成目录名称即可。
            #rewrite ^/subdir/(.*)$ /subdir/index.php/$1;
        }

3. Rewrite规则
    rewrite功能就是，使用nginx提供的全局变量或自己设置的变量，结合正则表达式和标志位实现url重写以及重定向。
        rewrite只能放在server{},location{},if{}中，并且只能对域名后边的除去传递的参数外的字符串起作用，例如 http://seanlook.com/a/we/index.php?id=1&u=str 只对/a/we/index.php重写。
            语法: rewrite regex replacement [flag];
    主要区别在于rewrite是在同一域名内更改获取资源的路径，而location是对一类路径做控制访问或反向代理，可以proxy_pass到其他机器。很多情况下rewrite也会写在location里，它们的执行顺序是：
        1)执行server块的rewrite指令
        2)执行location匹配
        3)执行选定的location中的rewrite指令
        如果其中某步URI被重写，则重新循环执行1-3，直到找到真实存在的文件；循环超过10次，则返回500 Internal Server Error错误。
    3.1 flag标志位
        last : 相当于Apache的[L]标记，表示完成rewrite
        break : 停止执行当前虚拟主机的后续rewrite指令集
        redirect : 返回302临时重定向，地址栏会显示跳转后的地址
        permanent : 返回301永久重定向，地址栏会显示跳转后的地址
        因为301和302不能简单的只返回状态码，还必须有重定向的URL，这就是return指令无法返回301,302的原因了。
        这里 last 和 break 区别有点难以理解：
            last一般写在server和if中，而break一般使用在location中
            last不终止重写后的url匹配，即新的url会再从server走一遍匹配流程，而break终止重写后的匹配
            break和last都能组织继续执行后面的rewrite指令
4. try_files指令（配合命名location，可以部分替代原本常用的rewrite配置方式，提高解析效率。） http://nginx.org/en/docs/http/ngx_http_core_module.html#try_files
    语法：try_files file ... uri 或 try_files file ... = code
    其作用是按顺序检查文件是否存在，返回第一个找到的文件或文件夹（结尾加斜线表示为文件夹），如果所有的文件或文件夹都找不到，会进行一个内部重定向到最后一个参数。
    只有最后一个参数可以引起一个内部重定向，之前的参数只设置内部URI的指向。最后一个参数是回退URI且必须存在，否则会出现内部500错误。命名的location也可以使用在最后一个参数中。
    与rewrite指令不同，如果回退URI不是命名的location那么$args不会自动保留，如果你想保留$args，则必须明确声明。
    例：
        location / {
            try_files $uri $uri/ /index.php$is_args$args;
        }
5. location指令
    语法：location [=|~|~*|^~|@] /uri/ { … }
    作用域：server
    location指令是用来为匹配的URI进行配置，URI即语法中的"/uri/"，可以是字符串或正则表达式。但如果要使用正则表达式，则必须指定前缀。
    [@] 即是命名location，一般只用于内部重定向请求。
        例：。。。
        try_files $uri @tornado;
        location @tornado {
            proxy_pass_header Server;
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Scheme $scheme;
            proxy_pass http://tornado;
        }
全局变量
    下面是可以用作if判断的全局变量

    $args ：         #这个变量等于请求行中的参数，同$query_string
    $content_length ： 请求头中的Content-length字段。
    $content_type ： 请求头中的Content-Type字段。
    $document_root ： 当前请求在root指令中指定的值。
    $host ：         请求主机头字段，否则为服务器名称。
    $http_user_agent ： 客户端agent信息
    $http_cookie ： 客户端cookie信息
    $limit_rate ：   这个变量可以限制连接速率。
    $request_method ： 客户端请求的动作，通常为GET或POST。
    $remote_addr ： 客户端的IP地址。
    $remote_port ： 客户端的端口。
    $remote_user ： 已经经过Auth Basic Module验证的用户名。
    $request_filename ： 当前请求的文件路径，由root或alias指令与URI请求生成。
    $scheme ：       HTTP方法（如http，https）。
    $server_protocol ： 请求使用的协议，通常是HTTP/1.0或HTTP/1.1。
    $server_addr ： 服务器地址，在完成一次系统调用后可以确定这个值。
    $server_name ： 服务器名称。
    $server_port ： 请求到达服务器的端口号。
    $request_uri ： 包含请求参数的原始URI，不包含主机名，如：”/foo/bar.php?arg=baz”。
    $uri ：          不带请求参数的当前URI，$uri不包含主机名，如”/foo/bar.html”。
    $document_uri ： 与$uri相同。
    例：http://localhost:88/test1/test2/test.php
        $host：localhost
        $server_port：88
        $request_uri：http://localhost:88/test1/test2/test.php
        $document_uri：/test1/test2/test.php
        $document_root：/var/www/html
        $request_filename：/var/www/html/test1/test2/test.php

实际使用建议

    所以实际使用中，个人觉得至少有三个匹配规则定义，如下：
    #直接匹配网站根，通过域名访问网站首页比较频繁，使用这个会加速处理，官网如是说。
    #这里是直接转发给后端应用服务器了，也可以是一个静态首页
    # 第一个必选规则
    location = / {
    proxy_pass http://tomcat:8080/index
    }
    # 第二个必选规则是处理静态文件请求，这是nginx作为http服务器的强项
    # 有两种配置模式，目录匹配或后缀匹配,任选其一或搭配使用
    location ^~ /static/ {
    root /webroot/static/;
    }
    location ~* \.(gif|jpg|jpeg|png|css|js|ico)$ {
    root /webroot/res/;
    }
    #第三个规则就是通用规则，用来转发动态请求到后端应用服务器
    #非静态文件请求就默认是动态请求，自己根据实际把握
    #毕竟目前的一些框架的流行，带.php,.jsp后缀的情况很少了
    location / {
    proxy_pass http://tomcat:8080/
    }