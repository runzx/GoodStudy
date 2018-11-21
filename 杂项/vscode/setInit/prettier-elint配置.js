// 安装：
// 这里需要全局安装最主要的两个node 模块，主要是要让 ide 编辑器能够读取全局环境来调用这2个模块
npm i eslint prettier -g --save-dev
 
// 这个是为了 eslint 跟 prettier 可以联合使用
npm i  --save-dev eslint-plugin-prettier
// 这个是为了让 eslint 跟 prettier 兼容，关闭 prettier 跟 eslint 冲突的rules
npm i  --save-dev eslint-config-prettier
// 为了让eslint 可以检查.vue文件的代码。
eslint-plugin-html：

// 配置如下 package.json(为了方便展示省略了不必要的部分):

  {
    "scripts": {
      "lint": "eslint *.js"
    },
    "eslintConfig": {
      "extends": ["prettier"],
      "plugins": ["prettier"],
      "rules": {
        "prettier/prettier": "error"
      }
    },
    "prettier": {
      "singleQuote": true,
      "semi": false
    }
  }​ {
    "scripts": {
      "lint": "eslint *.js"
    },
    "eslintConfig": {
      "extends": ["prettier"],
      "plugins": ["prettier"],
      "rules": {
        "prettier/prettier": "error"
      }
    },
    "prettier": {
      "singleQuote": true,
      "semi": false,
      "printWidth": 120, // 每行最大120字符
    }
  }
  eslint-plugin-prettier将其作为 ESLint 的一个插件
  eslintConfig  // 可以简化为:
  {
    "extends": ["plugin:prettier/recommended"]
  }

  eslint-plugin-prettier 提供的 recommended 配置会自动添加 eslint-config-prettier 和 eslint-plugin-prettier，为你省去一些手动的配置。
  你想使用 Prettier 的规则而不是 ESLint 的，为防止 ESLint 报错，你需要使用 
    eslint-config-prettier 来关闭所有可能引起冲突的规则。
      "rules": {
        "prettier/prettier": "error"
      }
  vscode 配置：
  {
    "prettier.eslintIntegration": true,
    "eslint.autoFixOnSave": true,
    "editor.formatOnSave": true
  }