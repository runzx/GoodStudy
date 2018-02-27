<?php
/**
 * Created by PhpStorm.
 * User: zhaix
 * Date: 2017/4/23
 * Time: 9:06
 */
一.FIG制定的PHP规范，简称PSR，是PHP开发的事实标准。
    PSR原本有四个规范，分别是：
        PSR-0   自动加载
        PSR-1   基本代码规范
        PSR-2   代码样式
        PSR-3   日志接口
        PSR-4   规范了如何指定文件路径从而自动加载类定义，同时规范了自动加载文件的位置。2013年底，新出了第5个规范——PSR-4。
    PSR-4和PSR-0最大的区别是对下划线（underscore)的定义不同。PSR-4中，在类名中使用下划线没有任何特殊含义。而PSR-0则规定类名中的下划线_会被转化成目录分隔符。
    PHP的包管理系统Composer已经支持PSR-4，同时也允许在composer.json中定义不同的prefix使用不同的自动加载机制。

二.PHP PSR-4 Autoloader 自动加载(中文版)

Autoloader
关键词 “必须”("MUST")、“一定不可/一定不能”("MUST NOT")、“需要”("REQUIRED")、
“将会”("SHALL")、“不会”("SHALL NOT")、“应该”("SHOULD")、“不该”("SHOULD NOT")、
“推荐”("RECOMMENDED")、“可以”("MAY")和”可选“("OPTIONAL")的详细描述可参见 [RFC 2119][] 。

1. 概述
本 PSR 是关于由文件路径 自动载入 对应类的相关规范，
本规范是可互操作的，可以作为任一自动载入规范的补充，其中包括 PSR-0，此外，
本 PSR 还包括自动载入的类对应的文件存放路径规范。

2. 详细说明
此处的“类”泛指所有的class类、接口、traits可复用代码块以及其它类似结构。
一个完整的类名需具有以下结构:
    \<命名空间>(\<子命名空间>)*\<类名>
    完整的类名 必须 要有一个顶级命名空间，被称为 "vendor namespace"；
    完整的类名 可以 有一个或多个子命名空间；
    完整的类名 必须 有一个最终的类名；
    完整的类名中任意一部分中的下滑线都是没有特殊含义的；
    完整的类名 可以 由任意大小写字母组成；
    所有类名都 必须 是大小写敏感的。
    当根据完整的类名载入相应的文件……
    完整的类名中，去掉最前面的命名空间分隔符，前面连续的一个或多个命名空间和子命名空间，作为“命名空间前缀”，其必须与至少一个“文件基目录”相对应；
    紧接命名空间前缀后的子命名空间必须与相应的”文件基目录“相匹配，其中的命名空间分隔符将作为目录分隔符。
    末尾的类名必须与对应的以 .php 为后缀的文件同名。
    自动加载器（autoloader）的实现一定不能抛出异常、一定不能触发任一级别的错误信息以及不应该有返回值。
3. 例子
下表展示了符合规范完整类名、命名空间前缀和文件基目录所对应的文件路径。

    完整类名	                        命名空间前缀	    文件基目录	            文件路径
    \Acme\Log\Writer\File_Writer	Acme\Log\Writer	./acme-log-writer/lib/	./acme-log-writer/lib/File_Writer.php
    \Aura\Web\Response\Status	    Aura\Web	    /path/to/aura-web/src/	/path/to/aura-web/src/Response/Status.php
    \Symfony\Core\Request	        Symfony\Core	./vendor/Symfony/Core/	./vendor/Symfony/Core/Request.php
    \Zend\Acl	                    Zend	        /usr/includes/Zend/	    /usr/includes/Zend/Acl.php
关于本规范的实现，可参阅 相关实例
注意：实例并不属于规范的一部分，且随时会有所变动。