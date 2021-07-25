# 让webstorm 识别vue cli3项目中的@路径别名正确解析的配置方法

setting -> Languages & Frameworks -> JavaScript -> Webpack :  
`...\lin-cms-vue\node_modules\@vue\cli-service\webpack.config.js`  

特别注意：如果在scss中使用@别名则需要加~号。  
比如在src目录下有一个var.scss文件，其他文件引用时则需写成：  
`@import "~@/var.scss";`  
