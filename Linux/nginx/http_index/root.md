## root 
1. root /home/;  
```
location / {
  try_files $uri 404; 
} 
```
http://a.bosstg.cn/ 重定向 为 /home404

### 下面这个会截获前面的 比如 location /admin/ {} 中的，然后root就会改变(当有2个以上不同root 的jpg...)
```
  location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$ {
		root  /home/adminLin;
    expires      30d;
  }
  location ~ .*\.(js|css)?$ {
		root  /home/adminLin;
    expires      12h;
  }
```
还可： `location ^~/admin/ {}` 不再被下面的截获， 这个不是正则表达式  