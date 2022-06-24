# 
1. Host '172.18.87.34' is blocked because of many connection errors; unblock with 'mysqladmin flush-hosts'
   1. mysql -u root -p 后台登陆mysql以后 执行 flush hosts; 
   2. 或者通过设置较大的 max_connect_errors值
      1. set global max_connect_errors=1000;
      2. v8.0 默认 100

2. performance_schema下的hosts表和host_cache;
   1. select * from host_cache\G;
   2. select * from hosts\G;