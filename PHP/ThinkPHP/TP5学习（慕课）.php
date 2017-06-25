<?php
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
        作API时，最好强制开启路由：
            'url_route_must'         => true,
    3）3种URL访问模式，可以自定义、配置
        路由三段法： Route::get('banner/:id','api/v1.Banner/getBanner');
            Route::get('hello/:id','api/v1.Banner/getBanner')    //三层，子目录用.分鬲
            模块名/控制器名/操作方法名
    4）route.php中路由表是按顺序匹配。
        '...product/:id'
        '...product/recent' 这在后是TP5会报错， 它把recent当ID了。
        可以把:id限定到正整数，这样recent就不会匹配进去了。
        ('...product/:id','...',[],['id'=>'\d+']); 用正则表达式限定ID只能是整数。
    5）路由分组，匹配性能要高些
        Route::group('api/:version/prodcut/',function(){
            Route::get('by_category','api/:version.Product/getAllInCategory');
            Route::get(':id','...',[],['id'=>'\d+']);
            Route::get('recent','...');
        });

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
            $all = input('param.');                   //助手函数，单个参数 ‘param.name’或'name'、'get.'、'get.name'
            function getUserInfo(Request $request, $userId) //依赖注入
            {
                return 'Hello,' . $request->param('name') . '！';
            }
        4) 方法	    描述
            param	获取当前请求的变量
            get	    获取 $_GET 变量
            post	获取 $_POST 变量
            put	    获取 PUT 变量
            delete	获取 DELETE 变量
            session	获取 $_SESSION 变量
            cookie	获取 $_COOKIE 变量
            request	获取 $_REQUEST 变量
            server	获取 $_SERVER 变量
            env	    获取 $_ENV 变量
            route	获取 路由（包括PATHINFO） 变量
            file	获取 $_FILES 变量
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

    快速移除用不到的命名空间
        ctrl+alt+o
    因为重名， 所以可以用：
        use app/api/model/banner as bannerModel     //设个别名
9. 全局异常处理
    1.记录日志
    2.统一错误信息返回格式
    3. 'exception_handle'       => 'app\lib\exception\ExceptionHandler', config.php中
        覆盖父类Handle中的render() ,实现自己处理异常。
10. 日志处理
    生产环境下， 只能用日志处理错误。
    TP5自动写日志配置：
        config.php : 'log'
            目录： runtime/log/ 或自定义：
            define('LOG_PATH',__DIR__.'/../log/'); TP5会自动生成此目录
11. 数据库
    1）Db原生用法（query）不自动加表前缀
        table方法必须指定完整的数据表名
        name方法可以用表前缀
    2)where('字段名','条件','表达式') //表达式法， 还是数组、闭包
    3)fetchsql() 返回sql语句
    4）log记录：
        'debug'           => true,
        在入口index.php处加LOG::init([])开启LOG记录
    5）模型查询：
        返回模型对象
        BannerModel::get($id);
        'default_return_type'  => 'json',
        模型名不对应表名：
            protected $table = 'pigcms_category';   //加前缀

            模型名	     约定对应数据表（假设数据库的前缀定义是 think_）
            User	    think_user
            UserType	think_user_type

        命令行快速建模：
            php think make:model api/BannerItem
        静态方式比模型实例好
        ORM 类与对象
            模型对应 类--》表
            类实例化--》记录
        方法：
            get ,find,all,select 
        SQL的主键和外键的作用：
            外键取值规则：空值或参照的主键值。
            (1)插入非空值时，如果主键表中没有这个值，则不能插入。
            (2)更新时，不能改为主键表中没有的值。
            (3)删除主键表记录时，你可以在建外键时选定外键记录一起级联删除还是拒绝删除。
            (4)更新主键记录时，同样有级联更新和拒绝执行的选择。
            简而言之，SQL的主键和外键就是起约束作用。
        主键是能确定一条记录的唯一标识，比如，一条记录包括身份正号，姓名，年龄。身份证号是唯一能确定你这个人的，其他都可能有重复，所以，身份证号是主键。
        
        外键--表的外键是另一表的主键, 外键可以有重复的, 可以是空值
            外键用于与另一张表的关联。是能确定另一张表记录的字段，用于保持数据的一致性。比如，A表中的一个字段，是B表的主键，那他就可以是A表的外键。
            外键--用来和其他表建立联系用的
            外键--一个表可以有多个外键
        关系确认：
            1.先确认--多对多关系
            2.
            3. 一个模型里包含外键，用belongsTo
                模型里没有外键， 用hasOne()
        关系关联：
            嵌套关联
         //只显示字段
        只显示字段方法： protected $visible =['url'];   //放模型里
        隐藏字段：       protected $hidden =['id'];
            临时隐藏：
                助手函数： collection($模型返回对象)->hidden(['id'])
            // 数据集返回类型
                'resultset_type'  => 'array', 在database.php中，
        关联数据新增：
            public function profile(){
                return $this->hasOne('Profile','uid')->setAlias(['user'=>'member']);
            }

            $user = User::get(1);
            // 如果还没有关联数据 则进行新增
            $user->profile()->save(['email' => 'thinkphp']);
            //系统会自动把当前模型的主键传入profile模型。
        关联数据更新：
            $user = User::get(1);
            $user->profile->email = 'thinkphp';
            $user->profile->save();
            // 或者
            $user->profile->save(['email' => 'thinkphp']);
        时间戳
            // 定义时间戳字段名
                protected $createTime = 'create_at';
                protected $updateTime = 'update_at';
12。用户自定义配置文件
    特定目录：application/extra/ tp5自动加载
        例：setting.php :
            return [
                'img_prefix' => 'http://zx.com/images'  //此目录应在public/images/
            ];
    读取：
        $c = config('setting.img_prefix');
13. 模型的读取器
    public function get字段名Attr($value,$data)    //驼峰法
        $value 字段值，$data 此条记录的数组
14. 设计公共基类
    为了把一些公共的函数或变量能在类里共用或处理， 要设计基类，让其它类先继承基类
    重构
        当发现有些函数、方法其它类也需要用，可以把其放入共同基类中， 这就是重构。
15. 定义PAI版本号

    开闭原则：
        扩展是开放的
        修改是封闭的

        意味着一个实体是允许在不改变它的源代码的前提下变更它的行为。
16. 令牌
    随机字符串： 
        1）够长
        2）不易仿造
17. 接口
    1）不需要保护
    2）保护： 地址、订单类。。。
18. 约定：
    1）token 放在http头数据包里
    这里是为了对关联表的排序：
            $product = self::with(
            [
                'imgs' => function ($query)
                {
                    $query->with(['imgUrl'])
                        ->order('order', 'asc');
                }])
            ->with('properties')
            ->find($id);
    2）返回token ，要用下面方式，小程序才能以res.data.token取出:
        return [
            'token' => $token
        ];
19. 前置方法
    ... extends Controller;
    protected $beforeActionList=[
        'all',                                  //无值的话为当前控制器下所有方法的前置方法。
        'first'=>['only'=>'second,third'],       
        'xxxxx'=>['except' => '方法名,方法名']    //不使用
    ];
20. 微信支付
    微信支付返回结果是异步， 微信会直接返回给客户端结果。
    流程：
        //用户选择商品后，向API提交包含他选择的商品相关信息
        //API检查库存
        //有库存，把订单存入数据库中中，下竟成功，告诉客户端可以支付
        //调用支付接口，进行支付
        //再次检查库存
        //服务器调用微信支付接口进行支付
        //微信返回支付结果
        //成功再进行库存检查
        //成功：库存扣除;失败：返回支付失败的信息
21. 重构
    把共用的，可重复的放到基类里， 通过继承方式
22. 时间戳
    protected $autoWriteTimestamp=true;

23. 事务
    Db::startTrans();
    tyr{
        ...
    }
    Db::commit();
    catch(\Exception $e){
        Db::rollback(); //回滚事务
        throw $e;
    }

        在 MySQL 中只有使用了 Innodb 数据库引擎的数据库或表才支持事务。
        事务处理可以用来维护数据库的完整性，保证成批的 SQL 语句要么全部执行，要么全部不执行。
        事务用来管理 insert,update,delete 语句
24. Wx SDK
    https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=11_1
    1. 类没有命名空间， 不能用use 导入类
25. 为调试微信回调加XDEBUG_SESSION_START，采用转发方式：
    $xmlData=file_get_contents('php://input');      //取微信返回的xml数据
    $result=curl_post_raw('http://api.zx.com/api/v2/pay/re_notify?XDEBUG_SESSION_START=1323233'，
        $xmlData);

    但这情况， 返回微信的的信息微信得在这个转发模块里发微信才收得到
26. 小程序 真机请求限制
    1） 要https ssl证书
    2） 接口地址要加入小程序合法域名中
27. 小程序 数据绑定：
    1）setData({})

28. 动态设置页面标题栏
    wx.setNavigationBarTitle()
29. 页面要用的变量最好在data{}里公示（先定义、声名）
