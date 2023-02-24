# Gradle加速下载的最佳实践
1. C:\user{你的用户名}.gradle 里 创建文件 init.gradle

```conf

allprojects{
    repositories {
        def ALIYUN_REPOSITORY_URL = 'https://maven.aliyun.com/repository/public/'
        def ALIYUN_JCENTER_URL = 'https://maven.aliyun.com/repository/jcenter'
        all { ArtifactRepository repo ->
            if(repo instanceof MavenArtifactRepository){
                def url = repo.url.toString()
                if (url.startsWith('https://repo1.maven.org/maven2')) {
                    project.logger.lifecycle "Repository ${repo.url} replaced by $ALIYUN_REPOSITORY_URL."
                    remove repo
                }
                if (url.startsWith('https://jcenter.bintray.com/')) {
                    project.logger.lifecycle "Repository ${repo.url} replaced by $ALIYUN_JCENTER_URL."
                    remove repo
                }
            }
        }
        maven {
            url ALIYUN_REPOSITORY_URL
            url ALIYUN_JCENTER_URL
        }
    }
}
```

2. 配置只在当前项目生效:  build.gradle 

```conf
; https://developer.aliyun.com/mvn/guide
allprojects {
  repositories {
    maven { url 'https://maven.aliyun.com/repository/public/' }
    mavenLocal()
    mavenCentral()
  }
}
; 如果想使用其它代理仓，以使用spring仓为例，代码如下
allprojects {
  repositories {
    maven { url 'https://maven.aliyun.com/repository/public/' }
    maven { url 'https://maven.aliyun.com/repository/spring/' }
    maven { url 'https://maven.aliyun.com/repository/gradle-plugin' }
    maven { url 'https://maven.aliyun.com/repository/jcenter' }
    
    mavenLocal()
    mavenCentral()
  }
}

; 项目中引用了gradle plugin包
repositories {
  maven{ url 'https://maven.aliyun.com/repository/central' }
  maven{ url 'https://maven.aliyun.com/repository/public' }
  maven{ url 'https://maven.aliyun.com/repository/gradle-plugin'}
}
```
3. gradle dependencies 或 ./gradlew dependencies 安装依赖