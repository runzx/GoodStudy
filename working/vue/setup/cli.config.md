# vue.config.js hooks
1.  compiler

```js
// vue.config.js相关代码
module.exports = {
	configureWebpack: config => {
		config.plugins.push({
			apply: (compiler) => {
				compiler.hooks.done.tap('DonePlugin', compilation => {
					console.log('编译完成')

				});
			}
		})
	}
}
```