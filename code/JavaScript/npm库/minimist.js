// 解析参数选项
var argv = require('minimist')
(process.argv.slice(2))
console.dir(argv)
// $ node example/parse.js -a beep -b boop
const res = { _: [], a: 'beep', b: 'boop' }
// $ node example/parse.js -x 3 -y 4 -n5 -abc --beep=boop foo bar baz
const res1 = {
  _: ['foo', 'bar', 'baz'],
  x: 3,
  y: 4,
  n: 5,
  a: true,
  b: true,
  c: true,
  beep: 'boop'
}

var parseArgs = require(' minimist ')
var argv = parseArgs(args, (opts = {}))

// 返回一个参数对象argv，该对象填充有来自的数组参数args。

argv._ //包含所有没有与之关联的选项的参数。

// 除非为该参数名称设置opts.string或 ，否则数字形式的参数将以数字形式返回opts.boolean。

// 之后的所有参数'--'都不会被解析，最终会以开头argv._。

// 选项可以是：

opts.string // -始终视为字符串的字符串或字符串数​​组参数名称
opts.boolean // -始终视为布尔值的布尔值，字符串或字符串数​​组。如果true将所有不带等号的双连字符参数视为布尔值（例如，fects --foo，not -f或--foo=bar）
opts.alias // -将字符串名称映射到字符串或字符串参数名称数组以用作别名的对象
opts.default // -将字符串参数名称映射到默认值的对象
opts.stopEarly // -如果为true，请argv._在第一个非选项之后填充所有内容
opts['--'] // -为true时，请argv._在之前-- 和argv['--']之后的所有内容中填充--。这是一个例子：
opts.unknown // -使用未在opts配置对象中定义的命令行参数调用的函数。如果函数返回false，则未知选项不会添加到中argv。
