<?php
/**
 * Created by PhpStorm.
 * User: zhaix
 * Date: 2017/5/13
 * Time: 10:15
 */
$path = "000/000/052,03211207478h3v0cn.jpg";

//把数组中的值赋给一些变量：
//list($var1,$var2,$var3) = array("Dog","Cat","Horse");
//explode — 使用一个字符串分割另一个字符串
//array explode ( string $delimiter , string $string [, int $limit ] );
    $image_tmp = explode(',',$path);
//    $return['image'] = C('config.site_url') . '/upload/foodshop_goods/' . $image_tmp[0] . '/' . $image_tmp['1'];
    $return['image'] =  '/upload/foodshop_goods/' . $image_tmp[0] . '/' . $image_tmp['1'];
    echo $return['image'];
echo 'hell,zhaix!';