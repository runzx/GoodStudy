<!--
 * @Author: zhaix
 * @Date: 2022-03-28 11:14:19
 * @LastEditTime: 2022-04-19 13:02:12
 * @LastEditors: Do not edit
 * @FilePath: \goodstudy\code\java\setup\setup.md
 * @Description: 
-->
#

Java SE 版本 JDK 版本 发布时间

Java SE 8 JDK1.8 2014-03-18 // Spider（蜘蛛）
Java SE 11 JDK11 2018-09-25
Java SE 12 JDK12 2019-3-20

## download

`https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html`

`https://www.oracle.com/java/technologies/downloads/#java8`
## setup sdk

1. windows setup
2. java -vesion
3. 环境变量 JAVA_HOME、CLASSPATH 和 PATH
   1. JAVA_HOME 默认情况下是`C:\Program Files\Java\jdk1.8.0_291`
   2. CLASSPATH `.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;`
      - 更好的做法是，不要设置 CLASSPATH！ 会污染整个系统环境
      - 默认的当前目录 '.' 对于绝大多数情况都够用了
      - 建议通过 `-cp` 命令传入 
   3. PATH `%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin`
   4. 默认会配置 `C:\Program Files\Common Files\Oracle\Java\javapath`(安装程序会拷入 java.exe,javac.exe,javaw.exe,jshell.exe)
4. 多版本 配置
   1. JAVA_17 = D:\codeing\tools\java\jdk-17.0.2
   2. JAVA_8 = C:\Program Files\Java\jdk1.8.0_291
   3. JAVA_HOME = %JAVA_17% 此时为　 v17
   4. JAVA_HOME_17 会认 JAVA_HOME 先赋值%JAVA_HOME_17%, 此时 JAVA_HOME_17 还没定义

## jre 运行环境

1. jvm 虚拟机
2. java 核心类库，支持文件

## java 平台

1. java SE 标准版 桌面程序
2. java EE 企事版 Web 程序
3. java ME 微型版 移动设备

## 历史

- 1995 sun 公司
- JDK 1.0
  - 1996-01-23 发布
- JDK 1.1
  - 1997-02-19 发布
- JDK 1.2
  - 1998-12-04 发布
- JDK 1.3
  - 2000-05-08 发布
- JDK 1.4
  - 2002-02-13 发布
  - 正则表达式，异常链，NIO，日志类，XML 解析器，XLST 转换器
- JDK 1.5/5.0
  - 2004-09-30 发布
  - 自动装箱、泛型、动态注解、枚举、可变长参数、遍历循环
- JDK 1.6/6.0
  - 2006-04 提供动态语言支持、提供编译 API 和卫星 HTTP 服务器 API，改进 JVM 的锁，同步垃圾回收，类加载
- 2010 oracel 收购 sun
- JDK 1.7/7.0
  - 2011-07-28 发布
  - 提供 GI 回收器、加强对非 Java 语言的调用支持（JSR-292,升级类加载架构
- JDK 1.8/8.0
  - 2014-03-18 发布
  - Lambda 表达式、方法引用、默认方法、新工具、Stream API、Date Time API 、Optional 类、Nashorn, JavaScript 引擎
- JDK 9.0
  - 2017-09-21 发布
  - JShell、不可变集合工厂方法、模块系统、http 协议 2.0 版本、Process API/CompletableFuture API/Optional Class/Stream API 增强、匿名内部类的钻石操作符、默认 G1 垃圾回收器、try 语句语法改进
- JDK 10.0
  - 2018-03-21 发布
  - JIT 编译器、局部变量类型引用、数据类型共享、并行 GC、root 证书、javah 工具、堆分配
- JDK 11.0
  - 2018-09-25 发布
  - 单命令运行 Java 文件、Lambda 参数局部变量语法、基于嵌套访问控制、动态类文件常量、误操作垃圾回收器、删除 Java EE 和 CORBA 模块、ChaCha20 与 Poly1305 加密算法、Aarch64 增强、ZGC 试用、弃用 Nashorn JS 引擎
- JDK 12.0
  - 2019-03-19 发布
  - JVM 增强、Switch 表达式、文件 mismatch() 方法、String 新方法 indent()/transform()/describeConstable()/resolveConstantDesc()、JVM 常量 API、instanceof 模式匹配
- JDK 13.0
  - 2019-09-17 发布
  - 支持编写文本块、Switch 表达式增强、重构遗留的 Socket API、取消提交未使用内存、动态 CDS 存档、支持 Unicode 12.1、DOM 和 SAX 工厂支持命名空间
- JDK 14.0
  - 2020-03-17 发布
  - 空指针异常增强提示、Switch 表达式（标准）、instanceof 模式匹配（预览）、Records 类（预览）、文本块（第二次预览）、打包工具（孵化）、JFR 事件流、ZGC ( 支持 macOS 和 Windows )、外部存储器访问 API（孵化）
- JDK 15.0
  - 2020-09-15 发布
  - 密封类（预览）、instanceof 模式匹配（第二次预览）、Records 类（第二次预览）、文本块（标准）、隐藏类、删除 Nashorn JS 引擎、重构遗留的 DatagramSocket API、外部存储器访问 API（第二次孵化）、弃用 RMI 激活、移除 Solaris 和 SPARC 的端口
- JDK 16.0
  - 2020-12-10 第一次提案冻结
  - 2021-01-14 第二次提案冻结
  - 2021-02-04 发布第一个预览版本
  - 2021-02-18 发布第二个预览版本
  - 2021-03-16 正式发布
