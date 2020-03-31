## index 
content阶段的指令  
处理以 '/' 结尾的location  

Syntax:	  index file ...;  
Default:	index index.html;  
Context:	http, server, location  

### 使用索引文件会导致内部重定向，并且可以在其他位置处理请求
internal redirect ，执行第2个location命令  
```nginx
location = / {
    index index.html;
}

location / {
    ...
}
```
如果内部重定向发生在proxy_pass反向代理后，那么重定向只会发生在代理配置中的同一个server。  
件可以是相对路径也可以是绝对路径，绝对路径需要放在最后  
文件可以使用变量$来命名  
`index  index.$geo.html  index.0.html  /index.html;`