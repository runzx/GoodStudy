
var glob = require("glob")

// options is optional
glob("**/*.js", options, function (er, files) {
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"] 递归匹配子目录
  // er is an error object or null.
  // files 是匹配到的文件的数组.
  // 如果 `nonull` 选项被设置为true, 而且没有找到任何文件,那么files就是glob规则本身,而不是空数组
  // er是当寻找的过程中遇的错误
})

glob 支持强大的匹配规则，但是要注意glob的匹配规则并不是正则表达式，详细支持如下：

  * 匹配0到多个字符
  ? 匹配一个字符
  [...] 匹配一个字符列表，类似正则表达式的字符列表
  !(pattern|pattern|pattern) 反向匹配括号内的模式
  ?(pattern|pattern|pattern) 匹配0或1个括号内的模式
  +(pattern|pattern|pattern) 匹配至少1个括号内的模式
  *(pattern|pattern|pattern) 匹配0到多个括号内的模式
  @(pattern|pat*|pat?erN) 精确匹配括号内的模式
  ** 匹配0到多个子目录，递归匹配子目录

  还支持 glob.sync() 同步接口，另外，glob还支持大量的参数选项，
    比如cwd,root 等等，具体请参考官方文档。
