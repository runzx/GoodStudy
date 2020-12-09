# 发布

1. 身份  
   一个 Microsoft 账号可以创建多个 Azure 组织；  
   一个组织可以创建多个 publisher 账号；  
   同时一个组织可以创建多个 PAT（Personal Access Token，个人访问令牌）；

   https://login.live.com/ 登录你的 Microsoft 账号  
   https://aka.ms/SignupAzureDevOps  
   右上角的 Security,创建新的个人访问令牌  
   Organization 要选择 all accessible organizations  
   Scopes 要选择 Full access

2. 创建发布帐号  
   `vsce create-publisher your-publisher-name`
   字母数字下划线，这是全网唯一的账号

   `vsce publish` 发布

3. 注意事项  
   README.md 文件默认会显示在插件主页；  
   README.md 中的资源必须全部是 HTTPS 的，如果是 HTTP 会发布失败；  
   CHANGELOG.md 会显示在变更选项卡；  
   如果代码是放在 git 仓库并且设置了 repository 字段，发布前必须先提交 git，否则会提示 Git working directory not clean；  
   另外，如前面所说，如果 Organization 没有选择 all accessible organizations，或者 Scopes 没有选择 Full access，发布的时候可能会报如下错误：401...

4. 增量发布 发布之后版本号的 patch 自增  
   `vsce publish patch`

5. 取消发布  
   `vsce unpublish (publisher name).(extension name)`
6. update  
   `vsce publish`
