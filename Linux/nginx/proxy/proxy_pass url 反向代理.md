# proxy_pass url 反向代理

1. url 只是 host, location 匹配的完整路径将直接透传给 url
   http://host
   http://host:port

```nginx
// 访问： /           后端：  /
// 访问： /api/xx     后端：  /api/xx
// 访问： /api/xx?aa  后端：  /api/xx?aa
location / {
proxy_pass http://node:8080;
}
```

2. url 包含路径, proxy_pass url 的 url 包含路径时，匹配时会根据 location 的匹配后的链接透传给 url  
   https//host/  
   https://host:port/api

```nginx
// 访问： /api/       后端：  /
// 访问： /api/xx     后端：  /xx
// 访问： /api/xx?aa  后端：  /xx?aa
// 访问：   /api-xx?aa    未匹配
location /api/ {
    proxy_pass http://node:8080/;
}
```

3. 当 proxy_pass 遇到正则
   当 location 以正则形式匹配时，proxy_pass 就不能以 / 结束了，也就是不能包含路径了，比如错误的：

4. 重写代理链接 - url rewrite
   用 rewrite 指令并且生效后，proxy_pass url 链接中的路径会被忽略

```nginx
// 访问： /           后端：  /node/
// 访问： /api        后端：  /node/api
// 访问： /api/       后端：  /?path=
// 访问： /api/a/b/c  后端：  /?path=a/b/c
location / {
    rewrite ^/api/(.*) /?path=$1 break;
    proxy_pass http://node:8080/node/;
}
```
