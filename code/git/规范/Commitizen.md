# Commitizen 
1. git cz 命令替代我们的 git commit 命令
2. 帮助我们生成符合规范的 commit message.
3. npm i -D commitizen cz-conventional-changelog


```json
// package.json
"script": {
    // ...,
    "commit": "git-cz",
},
 "config": {
    "commitizen": {
      "path": "node_modules/cz-conventional-changelog"
    }
}
```