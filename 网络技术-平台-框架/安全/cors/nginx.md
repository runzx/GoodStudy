# nginx cors 配置
1. nginx 的配置要必免和koa, spring boot 里自带的 cors 重复
2. 
```conf
; /etc/nginx/nginxconfig.io/cors.conf


# security headers
add_header 'Access-Control-Allow-Methods' 'GET,OPTIONS,PUT,DELETE,POST' always;
add_header 'Access-Control-Allow-Credentials' 'true' always;
add_header 'Access-Control-Allow-Origin' '*' always;    只允许配置单个域名或者 *
add_header 'Access-Control-Allow-Headers' 'bisid,zxtoken,Authorization,DNT,User-Agent,Keep-Alive,Content-Type,accept,origin,X-Requested-With,TENANT-ID' always;

add_header 'Access-Control-Allow-Headers' '*' always;
add_header 'Access-Control-Max-Age' 1728000 always;   本次预检请求的有效期，单位为秒; 20天（1728000秒）



if ( $request_method = 'OPTIONS' ) { 
  return 200;
}

```
## 

```conf



; http {} 里,并在里面添加

map $http_origin $corsHost {
    default 0;
    "~http://www.example.com" http://www.example.com;
    "~http://m.example.com" http://m.example.com;
    "~http://wap.example.com" http://wap.example.com;
}
; server {} 里,
add_header Access-Control-Allow-Origin $corsHost;


; 允许用户请求来自 localhost、www.example.com 或 m.example.com 的请求访 xxx.example2.com 域名时
; xxx.example2.com 域名的 location / 下配置
set $cors '';
if ($http_origin ~* 'https?://(localhost|www\.example\.com|m\.example\.com)') {
    set $cors 'true';
}
 
if ($cors = 'true') {
    add_header 'Access-Control-Allow-Origin' "$http_origin";
    add_header 'Access-Control-Allow-Credentials' 'true';

}


; 允许用户请求来自*.example.com访问xxx.example2.com域名时
; location /下配置
if ( $http_origin ~ http://(.*).example.com){
         set $allow_url $http_origin;
}

add_header Access-Control-Allow-Origin $allow_url;
```