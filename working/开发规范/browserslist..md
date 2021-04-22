# Browserslist 指定开发代码浏览器环境

1. `.browserslistrc` 文件
2. package.json 文件中添加一个 broserslist:['','']  
   `npx browserslist`可以查看

   last 1 version : 即支持各类浏览器最近的一个版本，当然这里的 1 是可变的数字。  
   1% : 支持市场份额大于 1% 的浏览器。  
   not dead: 这个 query 中 not 是逻辑非操作符，即对 dead 取反，而浏览器被认为是 dead 条件是：最新的两个版本中发现其市场份额已经低于 0.5% 并且 24 个月内没有任务官方支持和更新了。  
   not 也 queries 中惟一一个操作符，可以用在任何 query 前。

3. 最佳实践  
   直接选择支持的浏览器（如：last 2 Chrome versions），如果你的项目仅支持某个浏览器。之前见过公司的内部系统仅支持 Chrome 浏览器，就可以使用这个 query 啦。  
   如果要 Override 默认配置，可以通过组合 last 1 version, not dead , > 0.2% (or > 1% in US, > 1% in my stats). 来实现。  
   不要删除你不了解的浏览器。Opera Mini 在非洲的用户超过 10 亿比 Edge 的全球市场份额还大。QQ 浏览器在中国的份额超过 Firefox 和 Safari 的总合。

4. Babel, PostCSS, ESLint 等工具就可以为你提供一致的服务了。
