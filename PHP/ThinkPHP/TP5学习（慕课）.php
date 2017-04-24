1. URL路径：PATHINFO模式：
    http://serverName/index.php/module/controller/action/[pararma/value...]

    5.0取消了URL模式的概念，并且普通模式的URL访问不再支持，但参数可以支持普通方式传值，兼容模式：
        http://serverName/index.php（或者其它应用入口文件）?s=/模块/控制器/操作/[参数名/参数值...]
    URL不区分大小写。
        // 关闭URL中控制器和操作名的自动转换
        'url_convert'    =>  false,
    缺点：
        太长
        URL路径暴露出服务器文件结构
        不够灵活
        不能很好支持URL语义化（最大缺陷）
2. 5.0默认的应用入口文件位于public/index.php
    class 文件名第一个字母要大写！目录小写
3. 简化URL路径
    1）虚拟主机，取代localhost....
        httpd-vhosts.conf
    2)route.php
        动态注册： use think\Route;
        Route::rule('hello','sample/Test/Hello');   //原有的PATHINFO就失效！
        Route::rule('路由表达式','路由地址','请求类型','路由参数（数组）','变量规则（数组）');
    3）3种URL访问模式，可以自定义、配置
    4) Route::get('hello/:id','api/v1.Banner/getBanner')    //三层，子目录用.分鬲
4. 参数获取：
    $all = Request::instance()->param();
5. 验证, TP5内置了很多常用规则，也可自定义。// http://www.kancloud.cn/manual/thinkphp5/129356
    独门验证
    use think\Validate;
    $data=[
        'name'=>'vendor',
        'email'=>'vendor@qq.com'
    ];
    $validate = new Validate([
        'name'=>'require|max:10',
        'email'=>'email'
    ]);
    $result = $validate->check($data);
    //结果:
    echo $validate->getErro();
    //批量验证
    $result = $validate->bath()->check($data);
    val_dump($validate-getErro());  //返回数组
    验证器， 更好的封装
        单独建一个类