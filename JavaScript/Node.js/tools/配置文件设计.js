/**
 * Node.js应用程序中的配置变量
 * 
 * 启动节点应用程序之前设置NODE_ENV环境变量，然后使用该变量加载匹配的config.whatever.js文件
 * 
 */

// 基本的config/index.js文件，这将加载config.test.js文件，假设你的 NODE_ENV = test
    // （如果NODE_ENV未定义，我们将默认为'development'）

    var env = process.env.NODE_ENV || 'development', 
        cfg = require('./config.'+env);

    module.exports = cfg;

// config.test.js，它将包含config.global.js，然后根据需要覆盖它的json对象
    var config = require('./config.global');

    config.env = 'test';
    config.hostname = 'test.example';
    config.mongo.db = 'example_test';

    module.exports = config;

// config.global.js定义了所有的默认值：
    var config = module.exports = {};

    config.env = 'development';
    config.hostname = 'dev.example.com';

    //mongo database
    config.mongo = {};
    config.mongo.uri = process.env.MONGO_URI || 'localhost';
    config.mongo.db = 'example_dev';

// 现在我们把它们全部包装起来，并用在我们的代码中...例如在模型中，你可以在./models/user.js中做这样的事情：
    var mongoose = require('mongoose')
    , cfg = require('../config')
    , db = mongoose.createConnection(cfg.mongo.uri, cfg.mongo.db);


// 你只需要确保你定义了所有的默认值 ./config/config.global.js 
    // 并根据环境重写 ./config/config.<env>.js

// 请务必使用以下任何一种方式启动您的应用程序（我通常有测试，生产和开发环境）：
    NODE_ENV=test node ./app.js
    NODE_ENV=development node ./app.js
    NODE_ENV=production node ./app.js
