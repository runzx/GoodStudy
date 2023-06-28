# git proxy

```sh
vim ~/.gitconfig
[user]
        email = runzx@hotmail.com
        name = zhaixiang
[http]
        proxy = socks5://127.0.0.1:1086
[https]
        proxy = socks5://127.0.0.1:1086
        
# cli
git config --global http.proxy 'socks5://127.0.0.1:1086'
git config --global https.proxy 'socks5://127.0.0.1:1086'

```