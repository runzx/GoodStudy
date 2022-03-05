# plugin

1. `:PlugInstall`
2. `:PlugUpdate`
3. delete 配置文件对应 项
   - reload vimrc or reload vim
   - `:PlugClean`
4. https://github.com/junegunn/vim-plug/wiki/tutorial

```
call plug#begin('~/.vim/plugged')
" below are some vim plugin for demonstration purpose
Plug 'joshdick/onedark.vim'
Plug 'iCyMind/NeoSolarized'

" 美化任务栏的
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'

" dark_plus 
 Plug 'dunstontc/vim-vscode-theme'
" dracula
 Plug 'dracula/vim'

call plug#end()

" 设置配色方案
 colorscheme onedark
```
## vim plug (Git Bash 自带 vim)

1. `~/.vimrc` 配置文件
2. windows版 `~/_vimrc` `~/vimfiles/autoload/plug.vim`

# Neovim 的配置文件应该命名为 init.vim

1. `~/.config/nvim/init.vim`
   1. `~/.local/share/nvim/site/autoload`
   2. `curl -fLo ~/.local/share/nvim/site/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim`
2. `\share\nvim\runtime\autoload` plug.vim
3. `~/AppData/Local/nvim`
4. C:\Users\runzx\AppData\Local\nvim-data
