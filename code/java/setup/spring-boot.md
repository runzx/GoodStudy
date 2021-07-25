# spring boot

1. 2.2.x：支持的版本。2019.10 发布，是现在的活跃的主干
  - JUnit 5
  - Spring Framework 5.2：重大升级，可以看到它为 Cloud Native 的努力
  - 支持 Java13
  - 性能提升：表现在对所有的自动配置类改为了@Configuration 的 Lite 模式，提升性能
  - 新增@ConfigurationPropertiesScan 注解，自动扫描@ConfigurationProperties 配置类
  - 支持 RSocket
2. 2.3.x 
  - 优雅停机。
  - 配置文件位置支持通配符
  - web下的日期转换支持配置
  - MongoDB 4.0
  - spring-boot-starter-web不会再把validation带进来
  - 支持Java14
  - Docker支持

3. 2.3.x 取消release后缀
  - 采用了the new Spring versioning scheme
  - JUnit 5的老式引擎已经从spring-boot-starter-test中移除
  - 完全支持Java 15
  - MongoDB 4.1
  - 