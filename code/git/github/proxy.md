# github proxy
1. git config --global http.https://github.com.proxy socks5://127.0.0.1:1080

```sh
# ~/.gitconfig
[credential "https://gitee.com"]
	provider = generic
[user]
	email = runzx@hotmail.com
	name = zhaixiang
[http "https://github.com"]
	proxy = socks5://127.0.0.1:1080

```