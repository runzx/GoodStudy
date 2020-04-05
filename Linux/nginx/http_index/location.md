## location
```nginx
Syntax:	location [ = | ~ | ~* | ^~ ] uri { ... }
location @name { ... }
```
正则表达式用前面的'~*'修饰符（不区分大小写）或'~'修饰符（区分大小写）指定  
nginx首先检查使用前缀字符串定义的位置（前缀位置）。  

    其中，将选择并记住具有最长匹配前缀的位置。  
    然后按照在配置文件中出现的顺序检查正则表达式。  
    正则表达式的搜索在第一个匹配项上终止，并使用相应的配置。  
    如果未找到与正则表达式匹配的内容，则使用前面记住的前缀位置的配置。  

@前缀('@' prefix) 定义命名位置。这样的位置不用于常规请求处理，而是用于请求重定向。  
它们不能嵌套，也不能包含嵌套位置  

如果位置由以斜杠字符结尾的前缀字符串定义，并且请求由 proxy_pass， fastcgi_pass， uwsgi_pass， scgi_pass， memcached_pa​​ss或 grpc_pass之一处理，则将执行特殊处理  
响应URI等于此字符串但不带斜杠的请求，带有代码301的永久重定向将返回到请求的URI，并附加斜杠。  


```nginx
location = / {  
  # 精确匹配 '/',搜索将终止。 'http://bosstg.cn/' 
    [ configuration A ]
}

location / {
    [ configuration B ]
}

location /documents/ {
  # 先搜索正则匹配, 没有才匹配此
  # '/documents/p.jpg' 不会匹配此，而是E
    [ configuration C ]
}

location ^~ /images/ {
  # 如这是最长匹配，搜索将终止, '^~' 不是正则，是以后面的开头
  # '/images/1.gif'
  # '/api/v1/' 应加这个提高处理速度
    [ configuration D ]
}

location ~* \.(gif|jpg|jpeg)$ {
  # '/documents/1.jpg'
    [ configuration E ]
}
```