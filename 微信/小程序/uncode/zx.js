/**
 * 专用于从page-frame.html 中解析出wxss文件
 * 把 page-frame.html文件中setCssToHead()里的 var _C内容和
 * 后面setCssToHead(...)拷贝到data.js里
 * 运行node zx.js
 * zx.js 和data.js 与 page-frame.html 同一目录
 * 在项目目录下建wxss/目录存 样式文件 zx1.wxss...
 */
const __wxAppCode__ = {}
const $gwx = function() {}
const __vd_version_info__ = {}

const fs = require('fs')

// 把_C 里解析成 ./wxss/zx1.wxss文件，其它引用 @import ''
const preDo = _CCS => {
  let count = 0
  for (const item of _CCS) {
    count++
    const path = `./wxss/zx${count}.wxss`
    setCssToHead(item, '', { path })()
  }
}
const setCssToHead = function(file, _xcInvalid, _info) {
  const info = _info || {} // {path:'./app.wxss'}

  // 返回 css 字符串 rpx规格
  function makeup(file, opt) {
    const _n = typeof file === 'number'
    const ex = _n ? _C[file] : file
    let res = ''
    for (let i = ex.length - 1; i >= 0; i--) {
      const content = ex[i]
      if (typeof content === 'object') {
        const op = content[0]
        if (op == 0) res = content[1] + 'rpx' + res
        else if (op == 1) res = opt.suffix + res
        else if (op == 2) {
          // 2 @ 把 _C[0]中内容require
          // 'components/address/index.wxss'
          const count = (info.path.match(/\//g) || []).length - 1
          const path = new Array(count + 1).join('../')
          const str = `@import '${path}wxss/zx${content[1] + 1}.wxss';`
          // res = makeup(content[1], opt) + res
          res += str
        }
      } else res = content + res
    }
    return res
  }
  var rewritor = function(suffix, opt, style) {
    opt = opt || {}
    suffix = suffix || ''
    opt.suffix = suffix

    let css = makeup(file, opt)
    css = css.replace(/body/gi, 'page')
    fs.writeFile(info.path, css, err => {
      if (err) throw err
    })
  }
  return rewritor
}

const code = fs.readFileSync('./data.js','utf8')
// code里的变量 要用 var 命名才能在这访问 如 _C
eval(code)
preDo(_C)

const propArr = Object.keys(__wxAppCode__)
for (const key of propArr) {
  const item = __wxAppCode__[key]
  if (typeof item === 'function') item()
}
