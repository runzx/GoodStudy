
/**
 * 记录到文件
 * 它使用good-squeeze挤压功能仅选择操作事件。
    将过滤器流传good-squeeze递给SafeJson的事件，它将事件数据转换为JSON字符串。
    格式化为JSON字符串流的事件good-file，将其写入./test/fixtures/awesome_log。

 */
file: [{
    module: 'good-squeeze',
    name: 'Squeeze',
    args: [{ ops: '*' }]
}, {
    module: 'good-squeeze',
    name: 'SafeJson'
}, {
    module: 'good-file',
    args: ['./test/fixtures/awesome_log']
}]
/**
 * Log日志文件转存
 * 输出JSON到文件./logs大小超过1000字节时转存到logs目录下的新文件
 * 它使用rotating-file-stream的默认命名是YYYYMMDD-HHMM-nn-filename
 * （例如：20160509-2056-01-ops_log，20160509-2056-02-ops_log。）
 * 
 * good-file 不转存文件， 通过模块 rotating-file-stream
 */
file: [{
    module: 'good-squeeze',
    name: 'Squeeze',
    args: [{ ops: '*' }]
}, {
    module: 'good-squeeze',
    name: 'SafeJson',
    args: [
        null,
        { separator: ',' }
    ]
}, {
    module: 'rotating-file-stream',
    args: [
        'ops_log',
        {
            size: '1000B',
            path: './logs'
        }
    ]
}]

https://github.com/iccicci/rotating-file-stream

var rfs    = require('rotating-file-stream');
var stream = rfs('file.log', {
    size:     '10M', // rotate every 10 MegaBytes written, 单位：B K M G
    interval: '1d',  // rotate daily， h: hours; m: minutes
    compress: 'gzip' // compress rotated files
});