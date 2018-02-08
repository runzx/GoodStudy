
// 1. 如果要把glue 单独放一个模块，因为其正式用法 ：
    const Glue = require('glue');
    const Manifest = require('./config');
    const options = {relativeTo : __dirname};
    Glue.compose(Manifest, options, (err, server) =>{
        //...
        server.start((err) => {
            //...
        })
    })

// 2. index.js
    'use strict';

    const RestHapi = require('rest-hapi');
    const Composer = require('./server');
    // 所以这儿只用再加最后一个参数cb,前面的参数要server.js里也传入。
    Composer((err, server) => {

        if (err) {
            throw err;
        }

        server.start(() => {
            RestHapi.logUtil.logActionComplete(RestHapi.logger, "Server Initialized", server.info);
        });
    });

    // server.js
    'use strict';
    const Glue = require('glue');
    const Manifest = require('./manifest');

    const composeOptions = {
        relativeTo: __dirname
    };
    // bind方法把此方法compose指向Glue,后面的参数都传入
    module.exports = Glue.compose.bind(Glue, Manifest.get('/'), composeOptions);