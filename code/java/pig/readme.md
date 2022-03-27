## 后端技术栈

- 开发框架：Spring Boot 2.6
- 微服务框架：Spring Cloud 2021
- 安全框架：Spring Security + Spring OAuth 2.0
- 任务调度：Quartz 、 XXL-JOB
- 持久层框架：MyBatis Plus
- 数据库连接池：Druid
- 服务注册与发现: Nacos
- 客户端负载均衡：Spring Cloud Loadbalancer
- 熔断组件：Sentinel
- 网关组件：Spring Cloud Gateway
- 日志管理：Logback
- 运行容器：Undertow
- 分布式事务：LCN
- 工作流: Activiti 5.22

## 前端技术栈

- JS 框架：Vue、、Avue、nodejs
- CSS 框架：sass
- 组件库：ElementUI
- 打包构建工具：Webpack

## 模块说明

```
pigx
├── pigx-ui -- 前端工程[8080]
├── pigx-auth -- 授权服务提供[3000]
├── pigx-common -- 系统公共模块
├    ├── pigx-common-bom -- 公共依赖版本
├    ├── pigx-common-core -- 公共工具类核心包
├    ├── pigx-common-data -- 数据相关
├    ├── pigx-common-datasource -- 动态数据源相关
├    ├── pigx-common-excel -- excel操作相关
├    ├── pigx-common-feign -- feign 通用封装
├    ├── pigx-common-gateway -- 动态路由定义
├    ├── pigx-common-gray -- 灰度路由控制封装
├    ├── pigx-common-idempotent -- 幂等插件
├    ├── pigx-common-job -- 定时任务
├    ├── pigx-common-log -- 日志服务
├    ├── pigx-common-oss -- 通用文件系统
├    ├── pigx-common-security -- 安全工具类
├    ├── pigx-common-sentinel -- sentinel分装
├    ├── pigx-common-sequence -- 全局发号器
├    ├── pigx-common-swagger -- Swagger Api文档生成
├    ├── pigx-common-test -- oauth 2.0 单元测试方案
├    ├── pigx-common-xss  -- xss 安全过滤组件
├    ├── pigx-common-websocket  -- websocket 组件
├    └── pigx-common-transaction -- 分布式事务工具包
├── pigx-register -- 注册中心、配置中心[8848]
├── pigx-gateway -- Spring Cloud Gateway网关[9999]
├── pigx-upms -- 通用用户权限管理模块
├    └── pigx-upms-api -- 通用用户权限管理系统公共api模块
├    └── pigx-upms-biz -- 通用用户权限管理系统业务处理模块[4000]
└── pigx-visual  -- 图形化模块
├    ├── pigx-monitor -- Spring Boot Admin监控 [5001]
├    ├── pigx-daemon-elastic-job -- 分布式调度中心[elastic-job 版本]
├    ├── pigx-daemon-quartz -- 分布式调度中心[quartz]
├    ├── pigx-code-gen -- 图形化代码生成[5003]
├    ├── pigx-sso-client-demo -- sso 客户端接入示例
├    ├── pigx-tx-manager -- pigx分布式事务解决方案[5004]
├    ├── pigx-bi-platform -- 报表在线设计模块[5006]
├    ├── pigx-report-platform -- 大屏在线设计模块[9095]
├    ├── pigx-oa-platform -- 工作流模块[5005]
├    ├── pigx-pay-platform -- 微信支付宝收单模块[5010]
├    ├── pigx-mp-platform -- 微信管理模块[6000]
├    └── pigx-sentinel-dashboard -- sentinel 控制台[5005]
```

## 环境说明

| 依赖     | JVM 配置              |
| -------- | --------------------- |
| OS       | CentOS 7.6 4C 16G     |
| JDK      | OpenJDK 1.8.0_232-b09 |
| MySQL    | 5.7 & 并发连接 1000   |
| Jmeter   | 4.0                   |
| 商业版本 | 4.3                   |
