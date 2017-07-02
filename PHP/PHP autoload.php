<?php
spl_autoload_register() 
    //注册给定的函数作为 __autoload 的实现
    //将函数注册到SPL __autoload函数队列中。如果该队列中的函数尚未激活，则激活它们。

    bool spl_autoload_register ([ callable $autoload_function [, bool $throw = true [, bool $prepend = false ]]] )
    /*
    一个系统中仅能有一个__autoload函数，这样的话，我们在加载类文件时，所有的判断条件就都要写在一个__autoload，
    这样的话，我们系统中的__autoload函数将会比较复杂。
    而spl_autoload_register可以多次调用，从而注册多个自动类加载函数如:
    */
DIRECTORY_SEPARATOR
    //目录分隔符，是定义php的内置常量。
    //在 Windows 中，斜线（/）和反斜线（\）都可以用作目录分隔符，在linux上路径的分隔符是/
    $path = str_replace('\\', DIRECTORY_SEPARATOR, $class);
        //把windows下的 '\' 换成对应OS的分隔符

Callback / Callable 类型   
    //自 PHP 5.4 起可用 callable 类型指定回调类型 callback。
    //回调函数不止可以是简单函数，还可以是对象的方法，包括静态类方法。
    //PHP是将函数以string形式传递的。 可以使用任何内置或用户自定义函数，但除了语言结构例如：array()，echo，empty()，eval()，exit()，isset()，list()，print 或 unset()。
//例，OSS的autoload.php :
// $class 应是使用 use OSS\Core\MimeTypes; 自动生成: $class='OSS\Core\MineTypes'
// OSS SKD包目录结构：
/*
├─OSS-SDK/                  目录
│  ├─autoload.php           自动加载文件
│  ├─src/            
│  │  └─OSS/                OSS目录
│  │     ├─OssClient.php    必需： use OSS\OssClient;
│  │     ├─Result/
│  │     ├─Model/
│  │     ├─Http/
│  │     └─Core/
*/
function classLoader($class)
{
    $path = str_replace('\\', DIRECTORY_SEPARATOR, $class);         //换成OS的目录分隔符，例：use OSS\Core\MimeTypes; 自动生成 $class='OSS\Core\MineTypes'
    $file = __DIR__ . DIRECTORY_SEPARATOR .'src'. DIRECTORY_SEPARATOR . $path . '.php';
    if (file_exists($file)) {
        require_once $file;
    }
}
spl_autoload_register('classLoader');   //设置成回调方式， 在use 时自动激活

__DIR__	//文件所在的目录。如果用在被包括文件中，则返回被包括的文件所在的目录。
        //它等价于 dirname(__FILE__)。除非是根目录，否则目录中名不包括末尾的斜杠。（PHP 5.3.0中新增）
__FILE__	//文件的完整路径和文件名。如果用在被包含文件中，则返回被包含的文件名。
            //自 PHP 4.0.2 起，__FILE__ 总是包含一个绝对路径（如果是符号连接，则是解析后的绝对路径），而在此之前的版本有时会包含一个相对路径。
__FUNCTION__	//函数名称（PHP 4.3.0 新加）。自 PHP 5 起本常量返回该函数被定义时的名字（区分大小写）。
__CLASS__	    //类的名称（PHP 4.3.0 新加）。自 PHP 5 起本常量返回该类被定义时的名字（区分大小写）。
                //类名包括其被声明的作用区域（例如 Foo\Bar）。注意自 PHP 5.4 起 __CLASS__ 对 trait 也起作用。当用在 trait 方法中时，__CLASS__ 是调用 trait 方法的类的名字。
__METHOD__	    //类的方法名（PHP 5.0.0 新加）。返回该方法被定义时的名字（区分大小写）。
__NAMESPACE__	//当前命名空间的名称（区分大小写）。此常量是在编译时定义的（PHP 5.3.0 新增）。   

//修改samples目录中的Config.php文件
 OSS_ACCESS_ID      // 您从OSS获得的AccessKeyId
 OSS_ACCESS_KEY     //您从OSS获得的AccessKeySecret
 OSS_ENDPOINT       //您选定的OSS数据中心访问域名，如 http://oss-cn-hangzhou.aliyuncs.com
 OSS_TEST_BUCKET     //您要用来运行sample使用的bucket，sample 程序会在这个bucket中创建一些文件,注意不能用生产环境的bucket，以 免污染用户数据             