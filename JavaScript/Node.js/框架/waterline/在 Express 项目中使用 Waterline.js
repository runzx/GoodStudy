在 Express 项目中使用 Waterline

解决如何配置，在什么时机初始化，怎样组织所有的数据集合，
    以及在控制器中怎么调用 Waterline 中的数据集合这几个问题。

1. 数据集合的组织
    全部组织在 app/models 目录中，直接使用 module.exports 来将 Waterline.Collections 实例导出
    
    // app/models/post.server.model.js
    var Waterline = require('waterline');
    module.exports = Waterline.Collection.extend({
    identity: 'post',
    connection: 'mongo',
    schema: true,
    attributes: {
        title: {
        type: 'string',
        required: true
        },
        content: 'string',
        createTime: 'date',
        lastModifyTime: 'date'
    },
    beforeCreate: function(v, cb){
        v.createTime = new Date();
        return cb();
    },
    print: function(v) {
        console.log('\tTitle:', v.title, 'create at:', v.createTime);
        console.log('\tContent:', v.content);
    }
    });
    /**
     * 这里使用的是 exports 来导出，因为我们有两个值需要导出，
     * 一个是 Waterline 的实例，
     * 另外一个是 Waterline 的初始化配置。这在 Waterline 初始化的时候会用到。
     * 
     */
 2. 初始化
    // 在 bin/www 里完成的，原因是保证 Express 启动监听，必须在 Waterline 的成功初始化之后进行。
    // bin/www
    var app = require('../app');
    var config = require('../config/config');
    var waterline = require('../config/waterline');
    waterline.orm.initialize(waterline.config, function(err, models){
    if(err) {
        console.log('waterline initialize failed, err:', err);
        return;
    }
    console.log('waterline initialize success.');
    
    app.set('models', models.collections);
    app.listen(config.port, function(){
        console.log('Express listening on port:', config.port);
    });
    });
    /**
     * 初始化是直接使用 Waterline 实例的 intialize() 方法，需要传入对应的配置，
     * 这两个都是在 waterline.js 配置文件中导出的。为了方便我们在控制器代码中调用 Waterline 的数据集合，这里先将它加入到 Express 实例的配置列表中。
     * 
     */

    由于 Waterline 的初始化过程是异步的，所以我们没有办法直接使用 module.exports 或 exports 方法来导出它的实例，也就无法直接以 JavaScript 模块化的方式调用它实例中的数据集合。这里将借助 Express 的实例，来在控制器代码中使用它。
    增加一个中间件，将附加在 Express 实例上的数据集合，再加入到 Express 请求对象中，这样便可以在控制器代码中通过请求对象来访问 Waterline 实例的数据集合了。

    // config/express.js
    var express = require('express');
    var waterline = require('./waterline');
    module.exports = function(){
    console.log('express initialing...');
    var app = express();
    // ...
    app.use(function(req, res, next){
        req.models = app.get('models');
        next();
    });
    require('../app/routes/post.server.routes')(app);
    // ...
    return app;
    };
3. 在控制器里，便可以通过请求对象的 models 成员来调用了。
    // app/controllers/post.server.controller.js
    module.exports = {
    list: function(req, res, next){
        var page = parseInt(req.query.page, 10) ? parseInt(req.query.page, 10) : 1;
        var limit = parseInt(req.query.limit, 10) ? parseInt(req.query.limit, 10) : 1;
        req.models.post.find().paginate({page: page, limit: limit}).exec(function(err, docs){
        res.json(docs);
        });
    }
    };
// 虽然也可以通过全局变量来调用数据集合，不过在有其它办法的情况下，还是尽量不要使用全局变量吧。

https://coding.net/u/Stiekel/p/waterline-sample/git