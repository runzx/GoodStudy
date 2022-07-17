# acme

1. `curl https://get.acme.sh | sh` 普通用户和 root 用户都可以安装使用.
   1. 把 acme.sh 安装到你的 ~/.acme.sh/ 目录下
   2. 并创建 一个 bash 的 alias, 方便你的使用: `alias acme.sh=~/.acme.sh/acme.sh`
   3. 自动为你创建 cronjob, 每天 0:00 点自动检测所有的证书, 如果快过期了, 需要更新, 则会自动更新证书.
   4. 不会污染已有的系统任何功能和文件 , 所有的修改都限制在安装目录中: ~/.acme.sh/
2. acme.sh 实现了 acme 协议支持的所有验证协议

   1. http 和 dns 验证
      1. http 方式需要在你的网站根目录下放置一个文件, 来验证你的域名所有权
         1. `acme.sh  --issue  -d bosstg.cn -d ssgg.bosstg.cn  --webroot  /home/wwwroot/mydomain.com/`
         2. 指定域名, 并指定域名所在的网站根目录. acme.sh 会全自动的生成验证文件, 并放到网站的根目录, 然后自动完成验证. 最后会聪明的删除验证文件.
      2. 如果你用的 apache, nginx 服务器, 或者反代, acme.sh 还可以智能的从 nginx 的配置中自动完成验证, 你不需要指定网站根目录
         1. `acme.sh --issue  -d ssgg.bosstg.cn   --apache`
         2. `acme.sh --issue  -d ssgg.bosstg.cn   --nginx`
      3. acme.sh 在完成验证之后, 会恢复到之前的状态, 都不会私自更改你本身的配置
   2. 手动 dns 方式, 手动在域名上添加一条 txt 解析记录, 验证域名所有权.
      1. acme.sh 将无法自动更新证书，每次都需要手动再次重新解析验证域名所有权。
      2. dns 方式的真正强大之处在于可以使用域名解析商提供的 api 自动添加 txt 记录完成验证
         1. `./acme.sh --issue --dns dns_ali -d example.com -d www.example.com`

```sh
export Ali_Key="sdfsdfsdfljlbjkljlkjsdfoiwje"
export Ali_Secret="jlsdflanljkljlfdsaklkjflsa"
./acme.sh --issue --dns dns_ali -d example.com -d www.example.com
# Ali_Key and Ali_Secret will be saved in ~/.acme.sh/account.conf and will be reused when needed
```

3. 指定的所有参数都会被自动记录下来, 并在将来证书自动更新以后, 被再次自动调用.

## 升级 调试

1. 升级 acme.sh 到最新版
   1. `acme.sh --upgrade` 手动
   2. `acme.sh --upgrade --auto-upgrade` 自动升级， 关闭:`acme.sh --upgrade --auto-upgrade 0`
2. 出错怎么办: log `acme.sh --issue ..... --debug`

# 安装证书

```bash
# Nginx example:

acme.sh --install-cert -d example.com \
--key-file       /path/to/keyfile/in/nginx/key.pem  \
--fullchain-file /path/to/fullchain/nginx/cert.pem \
--reloadcmd     "service nginx force-reload"
# reload 并不会重新加载证书, 所以用的 force-reload

# cert.pem	服务端证书
# chain.pem	浏览器需要的所有证书但不包括服务端证书，比如根证书和中间证书
# fullchain.pem	包括了 cert.pem 和 chain.pem 的内容
# privkey.pem	证书的私钥
```
