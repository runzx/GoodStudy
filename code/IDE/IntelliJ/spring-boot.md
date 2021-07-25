# spring boot

1. SpringBoot 项目在 IntelliJ IDEA 中实现热启动

- spring-boot-devtools

```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-devtools</artifactId>
  <optional>true</optional> <!-- IntelliJ IDEA本地测试这个true、false热部署都有效 -->
</dependency>
```

- 开启 idea 自动编译及 automake 功能
  - Settings --> make project automatically (不处于运行，或者处于 Debug 运行中时，才会自动生效。)
  - CTRL + SHIFT + ALT + / --> Registry --> 找到并勾选 compiler.automake.allow.when.app.running
