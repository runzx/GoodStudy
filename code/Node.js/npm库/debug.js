// debug
// 一个专门用来控制输出调试日志的库。
// 主要的功能包括命名空间和色彩定义、毫秒级时间差、
// printf语法变量替换，附带个函数性能比较的代码示例意思一下。

// debug库会判断DEBUG环境变量，所以我们不需要修改代码，只调整一下程序运行环境就可以控制日志是否输出。另外，debug库不是简单地布尔判断DEBUG环境变量，而是会对DEBUG环境变量进行解析，允许我们选择性地控制输出哪些模块的日志，有效地解决了调试程序时候控制台日志堆积问题，因为我们可以控制debug，让其只输出我们关心的程序模块的日志。

// 定义log模块，选择特定模块log输出
// 模块文字颜色高亮
// log时间记录
// 输出log到文件等功能
const debug = require('debug')('mydebug:http')

const http = require('http')
http
  .createServer(function(req, res) {
    debug(req.method + ' ' + req.url)
    res.end('hello\n')
  })
  .listen(3000, function() {
    debug('listening')
  })

// 在linux中启动：
// DEBUG=mydebug:* node app.js

// 在windows中启动
// set DEBUG=mydebug:* & node app.js

// 把日志输出到文件的功能
set DEBUG=mydebug:*  &  node app.js mydebug:work> debug.log

// 得知DEBUG环境变量的设置支持通配符*。假设，我们的程序中存在如下调试器
// "connect:bodyParser"、"connect:compress"、"connect:session"，我们可以将DEBUG设置为
// DEBUG=connect:bodyParser,connect:compress,connect:session ，或者简单地使用通配符
DEBUG=connect:*
// 如果我们需要调试非connect相关的其他信息，可以使用 - 符号，“减去” connect，
DEBUG=*,-connect:*

// 在浏览器端，使用localStorage 对象控制debug：
localStorage.debug = 'worker:*'