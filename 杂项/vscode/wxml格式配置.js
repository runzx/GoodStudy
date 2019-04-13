// setting.json
//	修改后要重启 vscode
"minapp-vscode": {
	"wxmlFormatter": "prettier",
	"prettier": {
		"parser": "html",
		"printWidth": 80,

		"jsxBracketSameLine": true,
		"bracketSpacing": false,
		"jsxSingleQuote": true,
		"singleQuote": true,
		"semi": false
	}
	// 下面可不用
    // "formatMaxLineCharacters": 300,  这个没有用
    "disableAutoConfig": true,
    "wxmlFormatter": "prettyHtml",
    "prettyHtml":{
      
      "printWidth": 80,
    },

// prettyHtml 默认配置
"default": {
						"useTabs": false,
						"tabWidth": 2,
						"printWidth": 100,
						"singleQuote": false,
						"usePrettier": true,
						"wrapAttributes": false,
						"sortAttributes": false
					},

// 用prettyHtml <image/> 会自动 删除'/' : <image>