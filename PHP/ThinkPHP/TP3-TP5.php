<?php
/**
 * Created by PhpStorm.
 * User: zhaix
 * Date: 2017/4/23
 * Time: 10:42
 */
助手函数
    3.2	5.0版本
    C	config
    E	exception
    G	debug
    L	lang
    T	废除
    I	input
    N	废除
    D	model
    M	db
    A	controller
    R	action
    B	废除
    U	url
    W	widget
    S	cache
    F	废除

数据库
5.0的数据库查询功能增强，原先需要通过模型才能使用的链式查询可以直接通过Db类调用，原来的M函数调用可以改用db函数，例如：
3.2版本
    M('User')->where(['name'=>'thinkphp'])->find();
5.0版本
    db('User')->where('name','thinkphp')->find();
模型
新版的模型查询增加了静态方法，例如：
    User::get(1);
    User::all();
    User::where('id','>',10)->find();

系统常量的废弃
    REQUEST_METHOD IS_GET IS_POST IS_PUT IS_DELETE IS_AJAX __EXT__ COMMON_MODULE MODULE_NAME CONTROLLER_NAME ACTION_NAME APP_NAMESPACE APP_DEBUG MODULE_PATH等

3.2版本控制器命名
    IndexController.class.php

    <?php
    namespace Home\Controller;
    use Think\Controller;
    class IndexController extends Controller
    {
        public function hello()
        {
            echo 'hello,thinkphp!';
        }
    }
5.0版本控制器命名
    Index.php

    namespace app\index\controller;
    class Index
    {
        public function index()
        {
            return 'hello,thinkphp!';
        }
    }

路由
    5.0的URL访问不再支持普通URL模式，路由也不支持正则路由定义，而是全部改为规则路由配合变量规则（正则定义）的方式

命名规范 5.0
    目录和文件名采用‘小写+下划线’，并且以小写字母开头；
    类库、函数文件统一以.php为后缀；
    类的文件名均以命名空间定义，并且命名空间的路径和类库文件所在路径一致（包括大小写）；
    类名和类文件名保持一致，并统一采用驼峰法命名（首字母大写）
需要摒弃的3.X旧思想
    在5.0版本正式废除类似/id/1方式 可以通过‘get’获取到‘id’的方法，严格来讲这样的url是不属于$_GET的，现在可以通过‘param’获取
    新版的模型查询返回默认‘对象’，系统默认增加了'toArray'方法