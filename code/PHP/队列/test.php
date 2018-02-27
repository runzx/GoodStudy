<?php

//如果是TP5需要加命名空间
$redis=new Redis();
$redis->connect("127.0.0.1",6379);
//先设置，然后再把set注释输出get测试
//$redis->set('redistest',"测试redis");
echo $redis->get('foo');
exit;