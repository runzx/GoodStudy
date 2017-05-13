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
        路由三段法： Route::get('banner/:id','api/v1.Banner/getBanner');
            Route::get('hello/:id','api/v1.Banner/getBanner')    //三层，子目录用.分鬲
            模块名/控制器名/操作方法名
4. 参数获取：
    传参方法：
        1）.../:id       ':'后就是参数
        2) URL后 ?参数＝值
        3）post里 body中
    取参数方法：
        1）操作方法中变量参数对应
            public function hello($id,$name)
        2）使用think\Request 对象
            use think\Request;
            $all = Request::instance()->param();    //也可在parm('参数名')来指定相应参数
                如果是POST，？后的参数是取不到的
            $parm = Request::instance()->route();   //得到路由里参数
            $parm = Request::instance()->get();     //得到?后参数
            $all = Request::instance()->post();     //得到post参数
        3）使用助手函数
            $all = input('param');                   //助手函数，单个参数 ‘param.name’
            function getUserInfo(Request $request, $userId) //依赖注入
            {
                return 'Hello,' . $request->param('name') . '！';
            }
5.独立验证, TP5内置了很多常用规则，也可自定义。// http://www.kancloud.cn/manual/thinkphp5/129356
    独立验证
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
    val_dump($validate->getErro());  //返回数组
    验证器， 更好的封装
        单独建一个类
６.　TP5 目录结构
    runtime/ 缓存文件、log日志文件
    vendor/ 第三方类库，composer
    extend/ 第三方类库,框架自动注册
7. TP5自带web server
    php -S localhost:8080 route　r.php    //在public/下, 命令行
８.　模块
    namespace app\模块名\controller
    phpstorm自动命名空间规范：
        setting -> Directories -> 选中application目录，点击上面Sources,再点右则Source Folders 右边带p的小三角
            把application设为app
