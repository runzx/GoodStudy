## setting
1. prevent 去掉
2. delay -> 0
3. git autorefresh
4. Search:Follow Symlinks 搜索，将该项之前的复选框√去掉
## jsconfig.json
1. jsconfig.json 里 "exclude":["node_modules"]
2. 如果不存在include属性，则默认为包含包含目录和子目录中的所有文件。
3. jsconfig.json的工作区中没有 ，VS Code 将默认排除该node_modules文件夹
```json
{
	"compilerOptions": {	// 用于编译 TypeScript
		"module": "commonjs",	// 'amd'、'commonJS'、'es2015'、'es6'、'umd'
		"target": "ES2020",	// 'es6','es5','es3'
		"checkJs": false,  /* Typecheck .js files. */
		"lib": [
			"ES2020"
		]
	},
	"exclude": [
		"node_modules"
	]
}

```

##
1. 删除用户目录下的 .vscode完美解决