# husky
1. 校验 commit message 的最佳方式是结合 git hook
2. npm i husky@next
3. .husky目录 
4. npx husky add 命令添加对应的hook  (.husky/commit-msg 文件)
   1. `npx husky add .husky/commit-msg "npm test"`

```json
// package.json
"husky": {
    "hooks": {
      // ...,
      "commit-msg": "commitlint -e $GIT_PARAMS"
    }
  },
```