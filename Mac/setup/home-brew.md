# homebrew

## issuse
```sh

/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# 开始一直报错Failed to connect to raw.githubusercontent.com port 443: Connection refused error: Error: 7，

# 重装command line tools
removing the old tools ($ rm -rf /Library/Developer/CommandLineTools)
install xcode command line tools again ($ xcode-select --install).
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"


# 在https://www.ipaddress.com/查询raw.githubusercontent.com的真实IP。
sudo vim /etc/hosts
199.232.68.133 raw.githubusercontent.com

# Homebrew 源代码仓库

# 替换 USTC 镜像
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
brew update

# 对于 bash 用户
echo 'export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"' >> ~/.bash_profile

# 若之前使用的 git config url.<URL>.insteadOf URL 的方式设置的镜像，请手动删除 config 文件（一般为 ~/.gitconfig 或仓库目录下的 .git/config）中的对应字段。

# 使用科大源安装 Homebrew / Linuxbrew
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.ustc.edu.cn/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.ustc.edu.cn/homebrew-core.git"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles"
export HOMEBREW_API_DOMAIN="https://mirrors.ustc.edu.cn/homebrew-bottles/api"

/bin/bash -c "$(curl -fsSL https://github.com/Homebrew/install/raw/HEAD/install.sh)"
# 无法下载安装脚本， 可以使用我们每日同步的安装脚本文件。
/bin/bash -c "$(curl -fsSL https://mirrors.ustc.edu.cn/misc/brew-install.sh)"


# 重置为官方地址
unset HOMEBREW_BREW_GIT_REMOTE
git -C "$(brew --repo)" remote set-url origin https://github.com/Homebrew/brew

```