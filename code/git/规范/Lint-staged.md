# Lint-staged

1. 仅仅是文件过滤器
2. npm i -D lint-staged
3. 配置一下，如：.eslintrc、.stylelintrc 等，然后在 package.json 中引入
   1. .lintstagedrc.json
   2. .lintstagedrc.yaml
   3. .lintstagedrc.yml
   4. .lintstagedrc.js | mjs | cjs ( lint-staged.config.mjs )
4. .husky/pre-commit :
```sh
#!/usr/bin/env sh
. "$(dirname "$0")/_/husky.sh"

# npm
npx lint-staged
# pnpm
pnpm exec lint-staged
```

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.js": ["eslint --fix", "git add"],
    "*.vue": ["prettier --write", "eslint --fix", "stylelint --fix"]
  }
}
```

```js
// .lintstagedrc.mjs

// glob 模式 过滤； micromatch 微匹配
export default {
  "*": "your-cmd",
  "*.js":'', // /foo/bar/test.js /test.js
  "!(*test).js": '' // 除 test.js 外 所有.js 
  "./*.js": '', // 当前目录下 /test.js ; /foot/bar/test.js 不行
  "foo/**/*.js":'', // 所有/foo目录下； /test.js 不行
}
// 自动解析 git 根目录，无需配置
// 将绝对路径作为参数传递给 linter
```
## micromatch 微匹配
1. npm i micromatch 
2. Glob matching - Using wildcards (* and ?)
3. globstars (**) for nested directories 
4. Wildcards (**, *.js)
5. Negation ('!a/*.js', '*!(b).js') `否定`
6. extglobs (+(x|y), !(a|b))
7. POSIX character classes ([[:alpha:][:digit:]])
8. brace expansion (foo/{1..5}.md, bar/{a,b,c}.js)
9. regex character classes (foo-[1-5].js) `正则`
10. regex logical "or" (foo/(abc|xyz).js)


```js
const m = require('micromatch')

// []
console.log(m(['foo', 'bar', 'baz', 'qux'], ['f*', 'b*'])) //=> ['foo', 'bar', 'baz']
console.log(m(['foo', 'bar', 'baz', 'qux'], ['*', '!b*'])) //=> ['foo', 'qux']

// boolean
console.log(m.isMatch('foo', 'f*')) //=> true
console.log(m.isMatch('foo', ['b*', 'f*'])) //=> true
```

## 
1. `*`：匹配单路径下的 0 个或 多个 字符串。
2. `?`：匹配一个字符串。
3. `[...]`：匹配指定范围内的字符串，类似于正则表达式中的`[]`。如果`[]`中的第一个字符串是`!`或者`^`，则匹配不在范围内的任意字符串。
4. `!(pattern|pattern|pattern)`：匹配与提供模式中不匹配的内容。
5. `?(pattern|pattern|pattern)`：匹配提供模式中的 0次 或 1次。
6. `+(pattern|pattern|pattern)`：匹配提供模式中的 1次 或 多次。
7. `*(a|b|c)`：匹配提供模式中的 0次 或 多次。
8. `@(pattern|pat*|pat?erN)`：匹配与提供模式中完全匹配的。
9. `**`：和`*`一样，可以匹配路径中的 0个 或 多个，而且`**`可以匹配当前目录和子目录。但无法抓去符号链接的目录。递归目录
