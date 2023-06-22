# java cors

```java
// src\main\java\com\droom\common\mvc\WebMvcConfig.java

@Configuration
@Slf4j
public class WebMvcConfig extends WebMvcConfigurationSupport {
  /**
   * 跨域问题处理
   *
   */
  @Override
  public void addCorsMappings(final CorsRegistry registry) {
      registry.addMapping("/**")
              .allowedOriginPatterns("*")
              .allowedMethods("*")
              .exposedHeaders(CommonConstants.AUTHORIZATION)
              .allowCredentials(true)
              .maxAge(3600);
  }
}

public class CommonConstants {

    public static final BigDecimal HUNDRED = BigDecimal.valueOf(100);
    public static final String AUTHORIZATION="Authorization";
    public static final String DEF_KEY= "lock:user:";
    public static final String DEF_TASK_KEY= "lock:task:";

}
```