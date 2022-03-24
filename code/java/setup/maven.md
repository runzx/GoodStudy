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

## 本地仓库

1. `~/.m2/repository/`
2. ~/.m2/settings.xml 配置
   1. 位置 `<localRepository>/path/to/local/repo</localRepository> `

## 远程仓库

1. 中央仓库

```xml
<repositories>
	<repository>
		<id>ali-maven</id>
		<url>http://maven.aliyun.com/nexus/content/groups/public</url>
		<releases>
			<enabled>true</enabled>
		</releases>
		<snapshots>
			<enabled>true</enabled>
			<updatePolicy>always</updatePolicy>
			<checksumPolicy>fail</checksumPolicy>
		</snapshots>
	</repository>
</repositories>

```

2. 仓库镜像

```xml
<mirrors>
    <mirror>
      <id>alimaven</id>
      <name>aliyun maven</name>
      <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
      <mirrorOf>central</mirrorOf>
    </mirror>
</mirrors>
```

- <mirrorOf>\*</mirrorOf>，匹配所有远程仓库。
- <mirrorOf>repo1,repo2</mirrorOf>，匹配仓库 repo1 和 repo2，使用逗号分隔多个远程仓库
- <mirrorOf>\*,!repo1<mirrorOf>，匹配所有远程仓库，repo1 除外，使用感叹号将仓库从匹配中排除。
- <mirrorOf>external:\*</mirrorOf>，匹配所有远程仓库，使用 localhost 的除外，使用 file:// 协议的除外。也就是说，匹配所有不在本机上的远程仓库。
