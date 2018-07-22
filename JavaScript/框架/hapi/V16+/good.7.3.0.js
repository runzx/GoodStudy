/**
https://github.com/hapijs/good/blob/v7.3.0/README.md

1. Sets up the reporter named myConsoleReporter listening for 'response' and 'log' events and writes them to process.stdout.
2. Sets up the reporter named myFileReporter to listen for 'ops' events and logs them to ./test/fixtures/awesome_log.
3. Sets up the reporter named myHTTPReporter to listen for error events and POSTs them to http://prod.logs:3000 with additional settings to passed into Wreck

 */

// Creates a new GoodConsole object with the following arguments:
GoodConsole([config])
[config]    //- optional configuration object with the following keys
format  //- MomentJS format string. Defaults to 'YYMMDD/HHmmss.SSS'.
utc     //- boolean controlling Moment using utc mode or not. Defaults to true.
color   //- a boolean specifying whether to output in color. Defaults to true.
/**
Output Formats
Below are example outputs for the designated event type:
    "ops" - 160318/013330.957, [ops] memory: 29Mb, uptime (seconds): 6, load: [1.650390625,1.6162109375,1.65234375]
    "error" - 160318/013330.957, [error,event.tags] message: Just a simple error, stack: event.error.stack
    "request" - 160318/013330.957, [request,event.tags] data: you made a request
    "log" - 160318/013330.957, [log,event.tags] data: you made a default
    "response" - 160318/013330.957, [response, event.tags] http://localhost:61253: post /data {"name":"adam"} 200 (150ms)

    */
const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection();

const options = {
    ops: {
        interval: 1000
    },
    reporters: {                // 这是对象！
        myConsoleReporter: [
            {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ log: '*', response: '*' }]
            }, {
                module: 'good-console',
                args: [
                    {
                        format: 'YYMMDD/HHmm',  // Defaults 'YYMMDD/HHmmss.SSS'
                        utc: false,             // 此时用系统时间,默认 true
                        color: false
                    }
                ]
            },
            'stdout'
        ],
        myFileReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ ops: '*' }]
        }, {
            module: 'good-squeeze',
            name: 'SafeJson'
        }, {
            module: 'good-file',
            args: ['./test/fixtures/awesome_log']
        }],
        myHTTPReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ error: '*' }]
        }, {
            module: 'good-http',
            args: ['http://prod.logs:3000', {
                wreck: {
                    headers: { 'x-api-key': 12345 }
                }
            }]
        }]
    }
};

server.register({
    register: require('good'),
    options,
}, (err) => {

    if (err) {
        return console.error(err);
    }
    server.start(() => {
        console.info(`Server started at ${server.info.uri}`);
    });

});

/**
JSON流中的分隔符
要在JSON格式的对象之间插入逗号，请添加args到SafeJson格式器。
    good将args数组传递给SafeJson构造函数。

SafeJson([options], [stringify])
    [options]传递给Node Stream.Transform构造函数的配置对象。
        注意 objectMode总是true用于所有Squeeze对象。
    [stringify] 用于控制如何处理字符串化的配置对象。
        separator - 附加到每条消息的字符串。默认为“\ n”。
转换流将传入的数据串起来并将其转发。它不会在循环引用的情况下崩溃，
    而是在结果中包含一个“〜Circular”字符串。

 */

file: [{
    module: 'good-squeeze',         // 模块名
    name: 'Squeeze',                // 函数名
    args: [                         // 函数(args) 这相当于给此函数传参数
        { ops: '*' }
    ]
}, {
    module: 'good-squeeze',
    name: 'SafeJson',
    args: [
        null,
        { separator: ',' }
    ]
}, {
    module: 'good-file',
    args: ['./test/fixtures/awesome_log']
}]

/**
标签过滤
要通过标签过滤事件，传递good-squeeze一个字符串或标签数组。
    有关更多详细信息，请参阅Squeeze构造函数文档和Squeeze.subcription文档。

    Squeeze(events, [options])
        events 一个对象，其中每个键是一个有效的好事件，值是以下值之一：
            string - 过滤时包含的标签。'*'表示没有过滤。
            array - 要过滤的标签数组。[]表示没有过滤。
            object - 具有以下值的对象
                include- 表示过滤时要包含的标记的字符串或数组
                exclude- 表示要在过滤时排除的标记的字符串或数组。exclude优先于任何include标签。
        [options]传递给Node Stream.Transform构造函数的配置对象。注意 objectMode总是true用于所有Squeeze对象。
 */
console: [{
    module: 'good-squeeze',
    name: 'Squeeze',
    args: [{
        log: ['database', 'api'],
        response: 'hapi',
        error: '*'
    }]
}, {
    module: 'good-console'
}, 'stdout']
//  记录标记的事件database，api或两者兼而有之，响应事件标记hapi和所有的错误事件。
/**
 * 数据检查
        移除所有数据password（不会出现在输出中）
        检查敏感数据age（显示为X）
    通过过滤器的事件将去white-out审查或删除已识别的密钥。
    请注意，white-out将在整个对象中查找键，包括嵌套的对象。
 */
console: [{
    module: 'good-squeeze',
    name: 'Squeeze',
    args: [{
        log: '*',
        response: '*'
    }]
}, {
    module: 'white-out',
    args: [{
        password: 'remove',
        age: 'censor'
    }]
}, {
    module: 'good-console'
}, 'stdout']