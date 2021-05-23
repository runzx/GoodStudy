# maven

0. `http://maven.apache.org/install.html` download
1. `maven -v`
2. 国内源: `https://maven.aliyun.com/mvn/guide`
3. settings.xml :

```xml
<mirror>
  <id>aliyunmaven</id>
  <mirrorOf>*</mirrorOf>
  <name>阿里云公共仓库</name>
  <url>https://maven.aliyun.com/repository/public</url>
</mirror>
```
