## 实体框架的 .NET Framework 数据访问技术来定义和使用这些模型类。 
  实体框架（通常称为 EF）支持名为Code First的开发模式

  Code First 允许通过编写简单的类来创建模型对象

    这些类也称为 POCO 类，来自 "纯传统 CLR 对象"

从实体框架提供的 DbContext 基类派生  

1. 为了能够引用 DbContext 和 DbSet  
2. using System.Data.Entity;  
3. 你创建的 MovieDBContext 类将处理连接到数据库的任务，并将 Movie 对象映射到数据库记录

连接数据库 配置：  
* 应用程序 根目录的 web.config 文件  
* 添加到web.config 文件中的 `<connectionStrings>` 元素内
```xml
<connectionStrings>

  <add name="MovieDBContext" 
    connectionString="Data Source=(LocalDB)\v11.0;AttachDbFilename=|DataDirectory|\Movies.mdf;Integrated Security=True" 
    providerName="System.Data.SqlClient" 
  />
  
</connectionStrings>
```


