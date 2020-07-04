##  nginx 
1. `apk add nginx`
2. `nginx -t`  
error:  
nginx: [emerg] open() "/run/nginx/nginx.pid" failed (2: No such file or directory)  
`mkdir /run/nginx`  
3. `rc-service nginx start`  