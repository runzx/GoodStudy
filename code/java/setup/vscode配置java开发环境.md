#　 VSCODE 配置 java 开发环境

1. 安装 extensions

- Extension Pack for Java 会包括下面的扩展
- Language Support for Java(TM) by Red Hat
- Debugger for Java // java v8+
- Test Runner for Java // java v11+
- Maven for Java
- Project Manager for Java // java v11+
- Visual Studio IntelliCode

2. 因为新版需要 v11+, 故 v8 配置如下：
   - 2022 版不需要了？

```json
// setting.json 配置内容:
"java.configuration.runtimes": [
    {
      "name": "JavaSE-1.8",
      "path": "D:\\codeing\\tools\\java\\jdk1.8.0_321",
      "default": true
    },
    {
      "name": "JavaSE-17",
      "path": "D:\\codeing\\tools\\java\\jdk-17.0.2",
    },
  ],


  // 于启动 Java 语言服务器的 JDK 主文件夹的绝对路径
"java.jdt.ls.java.home": "D:\\codeing\\tools\\java\\jdk-17.0.2",
// 没指定上面，按 JDK_HOME,JAVA_HOME, PATH 搜索满足的java版本

  "java.home": "D:\\codeing\\tools\\java\\jdk-17.0.2", // 已弃用
```

## creat project

1. `Ctrl+Shift+P`，输入 `java:create java Project`
   1. No build tools
   2. Maven (create from archetype)
   3. Gradle (Provided by Gradle for Java)
   4. Spring Boot 
   5. Quarkus 全堆栈 Kubernetes 原生 Java 框架，用于专门针对容器优化 Java，并使其成为无服务器、云和 Kubernetes 环境的高效平台。
   6. MicroProfile  微服务的基准平台定义
   7. JavaFX  强大的图形和多媒体处理工具包
