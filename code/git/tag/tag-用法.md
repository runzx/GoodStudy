# tag 
1. 常用命令
  + 查看所有标签	`git tag`
  + 创建标签			`git tag name`
  + 指定提交信息	`git tag -a name -m "xxx"`
  + 删除标签			`git tag -d name`
  + 标签发布			`git push origin name`
  + 推送所有标签  `git push origin --tags`
  + 删除标签      `git tag -d version`
  + 删除远程标签：	`git push origin :refs/tags/version`
    - 就像 `git push origin :branch_1` 可以删除远程仓库的分支branch_1一样， 
    - 冒号前为空表示删除远程仓库的tag
  + 查看标签：`git tag` 或者 `git tag -l`
