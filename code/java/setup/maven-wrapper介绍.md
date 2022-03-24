# maven-wrapper 介绍

## 传统 maven 的使用流程

1. 配置环境变量把 mvn 可执行文件路径加入到环境变量，以便之后使用直接使用 mvn 命令
2. 项目 pom.xml 文件描述的依赖文件默认是下载在用户目录下的.m2 文件下的 repository 目录下。
3. 再次，如果需要更换 maven 的版本，需要重新下载 maven 并替换环境变量 path 中的 maven 路径
4.

## maven-wrapper 流程

1. mvnw 比如 mvnw clean ，如果本地没有匹配的 maven 版本，直接会去下载 maven，放在用户目录下的.m2/wrapper 中
2. 项目的依赖的 jar 包会直接放在项目目录下的 repository 目录，这样可以很清晰看到当前项目的依赖文件。
3. 如果需要更换 maven 的版本，只需要更改项目当前目录下.mvn/wrapper/maven-wrapper.properties 的 distributionUrl 属性值，更换对应版本的 maven 下载地址。mvnw 命令就会自动重新下载 maven。
4. 可以说带有 mvnw 文件的项目，除了额外需要配置 java 环境外，只需要使用本项目的 mvnw 脚本就可以完成编译，打包，发布等一系列操作。

## 项目初始化 mvnw 文件

1. 没有 mvnw 文件，需要先下载 maven，并把 mvn 可执行文件路径需加入的 PATH 中。然后执行以下命令，就会自动生成 mvnw 相关一系列文件
   1. `mvn -N io.takari:maven:wrapper`
2. idea 对 maven-wrapper 的支持
   1. 插件 maven-wrapper-support
      这个插件会监测项目下的.mvn/wrapper/maven-wrapper.properties 中的 distributionUrl 属性值，且自动下载 maven 版本到用户目录.m2/wrapper 目录中，并且改变 setting->build->build Tools ->maven-> maven home directory 的值
   2. 点击 Navigation Bar 中的 maven projectjs 中的命令，执行的命令是原生 mvn 的命令，而不是项目中下的 mvnw 命令
3. .mvn/wrapper/maven-wrapper.properties 的distributionUrl 