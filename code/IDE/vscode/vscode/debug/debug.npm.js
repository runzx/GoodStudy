
DEBUG=app,api   // 表示同时打印出命名空间为app、api的调试日志。
DEBUG=a*        // 支持通配符，所有命名空间为a开头的调试日志都打印出来

const debug = require('debug');
const appDebug = debug('app');
const apiDebug = debug('api');

// 通过-来进行排除
// 表示排除所有以account开头的命名空间的调试日志
DEBUG=*,-account* node 03.js
const listDebug = debug('app:list');
const profileDebug = debug('app:profile');
const loginDebug = debug('account:login');

// 当环境为production时，所有的debugA均不会输出
const debugA = debug('A:');
if (process.env.NODE_ENV === 'production') {
  debugA.enabled = false;
}

// 名称	          目的
DEBUG	            启用/禁用特定的调试名称空间。
DEBUG_HIDE_DATE	  从调试输出（非TTY）隐藏日期。
DEBUG_COLORS	    在调试输出中是否使用颜色。
DEBUG_DEPTH	      物体检查深度。
DEBUG_SHOW_HIDDEN	显示检查对象的隐藏属性。

// 自定义格式化

const createDebug = require('debug')
createDebug.formatters.h = function(v) {
  return v.toUpperCase();
};

createDebug.formatters.h = (v) => {
  return v.toString('hex')
}
const debug = createDebug('foo')
debug('this is hex: %h', new Buffer('hello world'))

// 调试使用printf样式的格式。以下是官方支持的格式化程序：
格式化程序	表示
%O	在多行上漂亮地打印对象。
%o	将对象漂亮地打印在一行上。
%s	字符串。
%d	数字（整数和浮点数）。
%j	JSON。如果参数包含循环引用，则替换为字符串“ [Circular]”。
%%	单个百分号（'％'）。这不消耗参数。