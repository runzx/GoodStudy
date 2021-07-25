## try_files指令

语法：try_files file ... uri 或 try_files file ... =code  
默认值：无  
作用域：server location  

`try_files $uri $uri/ $uri.html =404;`  
www.bosstg.cn/pwaDemo 返回成 www.bosstg.cn/pwaDemo.html
## isuee
1. code与'='间不能有空格  
否则会把code 当作最后一个参数返回，如下:  
`root /home/web/dist;`   
2020/03/31 13:15:22 [error] 27973#0: *1 open() "/home/web/dist404" failed ...  

2. 最后一个参数和'='间要有空格
否则后把它们合成一个参数看，循环执行  
`try_files $uri $uri/ $uri.html=404;`    
2020/03/31 12:50:35 [error] 22785#22785: *4 rewrite or internal redirection cycle while internally redirecting to "/favicon.ico.html=404.html=404.html=404.html=404.html=404.html=404.html=404.html=404.html=404.html=404.html=404" ... 