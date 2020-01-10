function Module(id, parent) {
  this.id = id
  this.exports = {}
  this.parent = parent
  this.filename = null
  this.loaded = false
  this.children = []
}

module.exports = Module

var module = new Module(filename, parent)

// require 并不是全局性命令，而是每个模块提供的一个内部方法，也就是说，
// 只有在模块内部才能使用 require 命令（唯一的例外是 REPL 环境）
Module.prototype.require = function(path) {
  return Module._load(path, this)
}

// 模块的加载实质上就是，注入exports、require、module三个全局变量，
// 然后执行模块的源码，然后将模块的 exports 变量的值输出。
