# icbc java sdk

1. download sdk `https://open.icbc.com.cn/icbc/apip/docs_sdk&demo.html`

2. lib 里 maven 导入本地 jar 包

```

mvn install:install-file -Dfile=icbc-api-sdk-cop.jar -DgroupId=icbc -DartifactId=icbc-api-sdk-cop -Dversion=2.0.0 -Dpackaging=jar

mvn install:install-file -Dfile=icbc-api-sdk-cop-io.jar -DgroupId=icbc -DartifactId=icbc-api-sdk-cop-io -Dversion=2.0.0 -Dpackaging=jar

mvn install:install-file -Dfile=icbc-ca.jar -DgroupId=icbc -DartifactId=icbc-ca -Dversion=2.0.0 -Dpackaging=jar

mvn install:install-file -Dfile=InfosecCrypto_Java1_02_JDK14+.jar -DgroupId=icbc -DartifactId=InfosecCrypto_Java1_02_JDK14 -Dversion=2.0.0 -Dpackaging=jar

mvn install:install-file -Dfile=proguard.jar -DgroupId=icbc -DartifactId=proguard -Dversion=2.0.0 -Dpackaging=jar
```

3. pom.xml 添加

```xml
<dependency>
    <groupId>icbc</groupId>
    <artifactId>icbc-api-sdk-cop</artifactId>
    <version>2.0.0</version>
</dependency>

<dependency>
    <groupId>icbc</groupId>
    <artifactId>icbc-api-sdk-cop-io</artifactId>
    <version>2.0.0</version>
</dependency>

<dependency>
    <groupId>icbc</groupId>
    <artifactId>icbc-ca</artifactId>
    <version>2.0.0</version>
</dependency>

<dependency>
    <groupId>icbc</groupId>
    <artifactId>InfosecCrypto_Java1_02_JDK14</artifactId>
    <version>2.0.0</version>
</dependency>

<dependency>
    <groupId>icbc</groupId>
    <artifactId>proguard</artifactId>
    <version>2.0.0</version>
</dependency>
```
