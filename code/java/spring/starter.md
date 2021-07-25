# starter,  连接包
1. 实现 starter 主要依赖自动配置注解
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-autoconfigure</artifactId>
</dependency>
```
2. `resource/META-INF` 目录下创建名称为 `spring.factories` 
   1. 当 Spring Boot 启动的时候，会在 classpath 下寻找所有名称为 spring.factories 的文件，然后运行里面的配置指定的自动加载类，将指定类(一个或多个)中的相关 bean 初始化。
3. 非官方的 starter 的命名格式为 `{name}-spring-boot-starter`
4. 官方的 starter 的命名格式为 `spring-boot-starter-{name}`