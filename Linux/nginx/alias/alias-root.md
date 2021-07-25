## alias root 不同

http://www.bosstg.cn/admin

location /admin/ {
      alias /home/www/bosstg/;
}
www.bosstg.cn/admin -> /home/www/bosstg/

location /admin/ {
      root /home/www/bosstg/;
}
www.bosstg.cn/admin -> /home/www/bosstg/admin/

location /admin {}  
  alias 可以访问 /admin或/admin/  
  root location匹配的path目录后面带不带"/"，都不会影响访问。