// workbox-build
/**
  generateSW()    使用预先缓存和一些基本可配置选项生成完整的服务工作者，将生成的服务工作文件写入磁盘
  generateSWString() 使用预先缓存和一些基本可配置选项生成完整的服务工作者，而无需将结果写入磁盘。
  injectManifest() 将清单注入现有服务工作者。这允许您在仍然利用workboxSW.precache（）逻辑的同时控制自己的服务工作者。
  getManifest()   只需生成清单，而不是完整的服务工作文件。如果您希望使用自己现有服务工作文件中的清单，并且可以自己包含清单，这将非常有用。

 */
const workboxBuild = require('workbox-build')

workboxBuild
  .injectManifest({
    swSrc: path.join(__dirname, 'app', 'sw.js'),
    swDest: path.join(__dirname, 'dist', 'sw.js'),
    globDirectory: './dist/',
    globPatterns: ['**/*.{html,js,css}'],
    globIgnores: ['admin.html'],
    templatedUrls: {
      '/shell': ['dev/templates/app-shell.html', 'dev/**/*.css']
    },

    // 要替换的预留代码区正则
    injectionPointRegexp: /(\.precacheAndRoute\()\s*\[\s*\]\s*(\))/
  })
  .catch(err => {
    console.error(`Unable to inject the precache manifest into sw.js`)
    throw err
  })
// 在构建文件中执行这段代码就会读取 app/sw.js 文件然后生成一个 dist/sw.js 文件含有注入的预缓存内容列表。
// VUEPRESS里代码
await workboxBuild.generateSW({
  swDest: swFilePath,
  globDirectory: outDir,
  globPatterns: [
    '**/*.{js,css,html,png,jpg,jpeg,gif,svg,woff,woff2,eot,ttf,otf}'
  ],
  ...(options.generateSWConfig || {})
})
