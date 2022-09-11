# 远程 仓库

1. 修改 `git remote set-url origin <remote-url>`
2. 查询 `git remote -v`
3. 删除 `git remote rm origin`

## 远程 分支

1. `git branch -a` 查看所有分支
   - `git branch -r` 查看 远程分支
2. `git push origin --delete `<branchName>
   - `git push br-demo -d rollup`
   - `git push app2 -d rollup`
3. `git merge origin/dev` 合并 远程 分支
4. `git checkout -b 本地分支名x origin/远程分支名x` 拉取远程分支并同时创建对应的本地分支
