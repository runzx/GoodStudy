<?php
/**
 * TP5应用：(redis 用于缓存)
 * 
 */
// 1，引用缓存
// 先开启redis执行文件
use think\Cache;

// 2，配置链接

$options = [
	// 缓存类型为File
	'type' => 'redis',
	// 缓存有效期为永久有效
	'expire' => 7200,
	//缓存前缀
	'prefix' => ''
];
$redis = Cache::connect($options);
//设置redis
$redis->set('type_list', $type_list);
//获取redis
$redis->get('type_list');
//清楚redis;
$redis->rm('type_list');

// 3. Session驱动
// 支持指定 Session 驱动，配置文件如下：

'session' => [
    'prefix'     => 'module',
    'type'       => 'redis',
    'auto_start' => true,
     // redis主机
    'host'       => '127.0.0.1',
     // redis端口
    'port'       => 6379,
     // 密码
    'password'   => '',
]
// 表示使用redis作为session类型。