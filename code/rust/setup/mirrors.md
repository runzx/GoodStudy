# 镜像地址
1. 覆盖默认的镜像地址 crates.io。

```conf
# ~/.cargo/config.toml

[source.crates-io]
replace-with = 'ustc'

[source.ustc]
registry = "git://mirrors.ustc.edu.cn/crates.io-index"

# 如果所处的环境中不允许使用 git 协议，可以把上述地址改为：
registry = "https://mirrors.ustc.edu.cn/crates.io-index"

```

2. 增加新的镜像地址:

```conf
# ~/.cargo/config.toml

[registries]
ustc = { index = "https://mirrors.ustc.edu.cn/crates.io-index/" }

# 项目 cargo.toml

[dependencies]
time = {  registry = "ustc" }

```

3. proxy 翻墙代理
  + `export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7891`
