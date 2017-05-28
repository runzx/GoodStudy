TP配置
<?php
1. TP3 的 C函数改成 TP5的 config()
    echo Config::get('配置参数1'); 或者使用助手函数
    echo config('配置参数1');
    // 读取二级配置参数
        echo Config::get('配置参数.二级参数
        echo config('配置参数.二级参数');
    //设置配置参数
        Config::set('配置参数','配置值'
    // 或者使用助手函数
        config('配置参数','配置值');
    也可以批量设置
        Config::set([
        '配置参数1'=>'配置值',
        '配置参数2'=>'配置值'
        ]);
    // 或者使用助手函数
        config([
        '配置参数1'=>'配置值',
        '配置参数2'=>'配置值'
        ]);
2. 开发规范
    1）类文件和类名相同， 首字母大写，驼峰法
    2）方法和属性        首字母小写，驼峰法
    3）配置参数、数据表、字段、函数    小写字母+下划线
3. API
    数据输出：新版的控制器输出采用 Response 类统一处理，而不是直接在控制器中进行输出，通过设置 default_return_type 就可以自动进行数据转换处理
        'default_return_type'=>'json'
4. 开启路由，并使用路由定义+默认 PATH_INFO 方式的混合：
   'url_route_on' => true,
   'url_route_must'=> false,
5. 自动读取扩展配置
    扩展配置文件放入application/extra目录，即可自动读取。
    自动读取的配置文件都是二级配置参数，一级配置名称就是扩展配置的文件名;
    如：echo config('配置参数.二级参数');
        .../extra/wx.php 中小程序配置：
            return [
                //  +---------------------------------
                //  微信相关配置
                //  +---------------------------------

                // 小程序app_id
                'app_id' => 'wx2565bfd15aa0f85c',
                // 小程序app_secret
                'app_secret' => '04637ff6132d22dc35635b7fc862f6be',

                // 微信使用code换取用户openid及session_key的url地址
                'login_url' => "https://api.weixin.qq.com/sns/jscode2session?" .
                    "appid=%s&secret=%s&js_code=%s&grant_type=authorization_code",

                // 微信获取access_token的url地址
                'access_token_url' => "https://api.weixin.qq.com/cgi-bin/token?" .
                    "grant_type=client_credential&appid=%s&secret=%s",


            ];
        使用时：
            $this->wxAppID = config('wx.app_id');
            $this->wxAppSecret = config('wx.app_secret');
6. TP5配置设置
    新的配置文件目录，index.php : 
        define('CONF_PATH',__DIR__.'/../conf/');
        此目录下：config.php :
            return[
                'app_email'=>'zhaix@qq.com',
                'app_debug'=>true       //这会取代原TP5的配置，array_merge
            ];
            此目录下config.php, database.php会自动加载， 替换原来配置。
            此目录下建extra/目录，在这目录下的配置TP5会自动加载
        如果你更改了CONF_PATH，那么
            扩展配置文件目录应该是CONF_PATH/extra，
            模块配置目录则变成 CONF_PATH/module/，
                模块的扩展配置目录则变成CONF_PATH/module/extra。
        默认会加载database和validate两个扩展配置文件。
7. TP5场景配置
    应用配置config.php 里设'app_status'=>'home'（场景）
    在上面设置的目录conf/下可设home.php, 这里面为home场景下配置。
    <?php
        return[
            'database'=[
                'password'=>'123456'
            ]
        ];          //这里要注意，database里的选项，如果这没设， 则原配置里的配置都被删除了。
8. 模块配置
        在conf/下建模块同名目录如： index/
            config.php
            此下可以建extra/目录，能此模块会自动加载
    动态配置
        在控制器的__construce()里 config('xxx','xxyyxx');
9. config类，助手函数config()

10. Request::get PATH_INFO的值不包含在get中（get为？后的）
