## router class
@ResquestMapping
要通过目录来划分 v1..., 要判断包的名称
在application.yml
  missyou:
    api-package: com.lin.missyou.api  // api 目录下的才是自动前缀，如 v1/

      @RestController
      @RequestMapping("/banner")    // bosstg.cn/v1/banner/name/xxx

public class AutoPrefixUrlMapping extends RequestMappingHandlerMapping {
  @Value("${missyou.api-package}")
  private String apiPackagePath;