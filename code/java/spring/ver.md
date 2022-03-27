# Spring Cloud Alibaba 的版本与 Spring Boot、Spring Cloud 版本的兼容关系

| Spring Boot             | Spring Cloud      | Spring Cloud Alibaba |
| ----------------------- | ----------------- | -------------------- |
| 3.0.0-M1<3.1.0-M1       | 2022.0.0-M1       | 0.9.x                |
| 2.6.5-SNAPSHOT<3.0.0-M1 | 2021.0.2-SNAPSHOT | 0.9.x                |
| 2.6.1 <2.6.5-SNAPSHOT   | 2021.0.1          | 0.9.x                |
| 2.6.0-RC1 <2.6.1        | 2021.0.0-RC1      | 0.9.x                |
| 2.6.0-M3 <2.6.0.RC1     | 2021.0.0-M3       | 0.9.x                |
| 2.4.x <2.6.0.M1         | 2021.0.0-M1       | 0.9.x                |
| 2.2.x <2.4.0.M1         | Hoxton.SR12       | 2.2.0                |
| 2.1.x                   | Greenwich         | 2.1.2                |
| 2.0.x                   | Finchley          | 2.0.4                |
| 1.5.x                   | Edgware           | 1.5.1                |
| 1.5.x                   | Dalston           | 0.1.x                |

## 毕业版本依赖关系(推荐使用)

1. https://github.com/alibaba/spring-cloud-alibaba/wiki/%E7%89%88%E6%9C%AC%E8%AF%B4%E6%98%8E

| Spring Boot    | Spring Cloud      | Spring Cloud Alibaba   |
| -------------- | ----------------- | ---------------------- |
| 2.6.3          | 2021.0.1          | 2021.0.1.0             |
| 2.4.2          | 2020.0.1          | 2021.1                 |
| 2.3.12.RELEASE | Hoxton.SR12       | 2.2.7.RELEASE          |
| 2.3.2.RELEASE  | Hoxton.SR9        | 2.2.6.RELEASE          |
| 2.1.13.RELEASE | Greenwich.SR6     | 2.1.4.RELEASE          |
| 2.2.5.RELEASE  | Greenwich.SR3     | 2.2.1.RELEASE          |
| 2.2.X.RELEASE  | Greenwich.RELEASE | 2.2.0.RELEASE          |
| 2.1.X.RELEASE  | Greenwich         | 2.1.2.RELEASE          |
| 2.0.X.RELEASE  | Finchley          | 2.0.4.RELEASE 停止维护 |
| 1.5.X.RELEASE  | Edgware           | 1.5.1.RELEASE 停止维护 |

2. RELEASE 版本

```xml
<!-- Spring Cloud 2021 -->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-alibaba-dependencies</artifactId>
    <version>2021.0.1.0</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>

<!-- Spring Cloud 2020 -->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-alibaba-dependencies</artifactId>
    <version>2021.1</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>

<!-- Spring Cloud Hoxton -->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-alibaba-dependencies</artifactId>
    <version>2.2.7.RELEASE</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>


```
