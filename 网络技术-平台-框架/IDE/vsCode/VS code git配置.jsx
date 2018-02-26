//  visual Studio Code Git 使用

// 请确保你安装了最新的VS Code.http://code.visualstudio.com/
// 请确保安装了最新版的Git。https://git-scm.com/download。git安装到环境变量里， 确保任意路径可以访问。
// 参考链接：https://code.visualstudio.com/Docs/editor/versioncontrol

1. VS Code 一个文件夹，单击左侧的git图标“初始化GIT存储库”的按钮，单击。
2. 提交保存

    提交保存的第一步是暂存文件。

    第二步是输入提交信息。

    第三步然后使用状态栏的提交按钮提交全部更改。

3. ctrl+shift+P，输入git，会看到VS CODE支持的所有git命令

4.撤销操作
    输入 Undo Last Commit，撤销上次操作。输入Unstage,撤销暂存
5.分支
    输入Branch可以创建当前内容的分支。创建分支时需要输入分支名称。
6.checkout
    创建分支后，使用checkout命令可以拉取特定的分支内容。
7。冲突合并
    VS Code 会检测文件冲突，并以<<<<<,>>>>,====和颜色区分出来。 解决冲突之后，直接提交就行了。
8。文件比较
    在git文件列表中，单击一个未提交更改的文件，就会打开两个窗口来显示变更的内容。
9。连接远程代码仓库
    git remote add origin https://github.com/xuanhun/vscode.git  //git@www.bosstg.cn:/home/gitwx/wxdc.git
    git pull origin master
    接下来我们从下拉菜单中执行发布命令,提醒我们输入账号和密码。

10.简化一点的方法
    当然我们也可以使用git 的clone命令，从远程克隆一个Reps，然后直接用vscode打开文件夹， VS Code 会自动识别各项配置。
11.持久化账号
    远程连接git的问题解决了，如果你不想每次同步的时候都输入账号信息，可以全局存储账号， 解决这个问题。
    git config --global credential.helper wincred