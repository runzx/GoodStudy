/* Entity Framework是微软的Object Relational Mapper(对象关系映射器)，也就是我们平常说的ORM
  消除了开发者为数据访问编写的绝大多数管道代码的需要(比如使用ADO.NET)
  首发版本是EF3.5，是伴随着.Net Framework 3.5 SP1和VS 2008 SP1一同发布的。从那之后，EF已经进化了很多很多，
  当前版本是 6.4.0(20200328)

  可以使用更高级的语言（例如C#）来编写所有的数据访问逻辑而不是编写SQL查询和存储过程
  第一版只支持Database First
  第二版，也就是EF4，也开始支持Model-First
  EF的Code First在版本4.1中引入。Code First不需要EDMX文件了

首先，它可以将数据库暴露成对象的集合，这是通过利用很多关键的类完成的。前提是你要了解DbContext
  DbContext有泛型集合属性，每个属性的类型是DbSet<TRowType>对应于每个表。
    集合中的每个对象指的是一个实体，代表相应表中的一行
    数据表中的列是定义在TRowType类中的属性。
  
  EF构建在provider架构之上
    开发者使用C#创建一个LINQ查询时，EF框架引擎会连接一个provider，将它转换成实际的SQL语句

安装实体框架6
  "工具" 菜单中，选择 " NuGet 包管理器"，然后选择 "程序包管理器控制台"。
  Install-Package EntityFramework
    Install-Package EntityFramework -Version 6.2.0  // 指定版本
    4.1 之前的 EF 运行时是 .NET Framework 的一部分，不能单独安装

  安装 EF6 NuGet 包应会自动从你的项目中删除对 System.object 的任何引用
  DbContext 和 Code First 类型的命名空间尚未更改。 这意味着，对于使用 EF 4.1 或更高版本的许多应用程序，你无需更改任何内容


从版本6开始，EF成为一个开源项目
EF 6.0.0运行时于2013年10月发布到NuGet
EF 6.1.0运行时于2014年3月发布到NuGet
EF 6.1.3运行时于2015年10月发布到NuGet
EF 6.2    运行时于2017年10月发布到NuGet
EF 6.3.0  运行时已于 2019 年 9 月发布到 NuGet
  支持 .NET Core 3.0，是跨平台的
  .NET Framework 4.x，还面向 .NET Standard 2.1
EF 6.4.0  运行时已于 2019 年 12 月发布到 NuGet

从 EF6 开始，我们引入了基于代码的配置
  "约定 over 配置" 原则

"实体框架配置" 部分
  从 EF 4.1 开始，你可以使用配置文件的appSettings节为上下文设置数据库初始值设定项。 
  在 EF 4.3 中，我们引入了自定义entityFramework部分来处理新设置。 
  实体框架仍将识别使用旧格式设置的数据库初始值设定项，但建议在可能的情况下移动到新的格式。

  entityFramework节会自动添加到项目的配置文件中: */
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <configSections>
    <!-- For more information on Entity Framework configuration, visit http://go.microsoft.com/fwlink/?LinkID=237468 -->
    <section name="entityFramework"
       type="System.Data.Entity.Internal.ConfigFile.EntityFrameworkSection, EntityFramework, Version=4.3.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089" />
  </configSections>
</configuration>

// 连接字符串位于标准connectionStrings元素中，不需要entityFramework部分
//   基于 Code First 的模型使用常规 ADO.NET 连接字符串
<connectionStrings>
  <add name="BlogContext"  
        providerName="System.Data.SqlClient"  
        connectionString="Server=.\SQLEXPRESS;Database=Blogging;Integrated Security=True;"/>
</connectionStrings>
/* 
基于代码的配置类型（EF6）
  配置文件优先于基于代码的配置 !
  从 EF6 开始，可以指定 EF 的 DbConfiguration，以便在应用程序中使用基于代码的配置。 
  在大多数情况下，无需指定此设置，因为 EF 会自动发现你的 DbConfiguration。
    只为应用程序创建一个 DbConfiguration 类。 此类指定应用域范围内的设置。
    将 DbConfiguration 类放在与 DbContext 类相同的程序集中。
    为 DbConfiguration 类指定一个公共的无参数构造函数
    通过在此构造函数中调用受保护的 DbConfiguration 方法来设置配置选项。
      遵循这些指导原则后，EF 可以通过需要访问模型和应用程序运行时的两个工具自动发现和使用配置。
    
    默认情况下，上下文管理与数据库的连接。 上下文会根据需要打开和关闭连接。
    使用 Web 应用程序时，请为每个请求使用上下文实例。
    应用程序与之交互的主类就 System.Data.Entity.DbContext （通常称为上下文类）
    定义 DbContext 派生类
      使用上下文的建议方法是定义从 DbContext 派生的类，并公开 DbSet 属性，这些属性表示上下文中指定实体的集合。 
      如果使用的是 EF 设计器，则会为您生成上下文。 
      如果使用 Code First，要自行编写上下文。
 */
public class ProductContext : DbContext
{
    public DbSet<Category> Categories { get; set; }
    public DbSet<Product> Products { get; set; }
}
/* 
拥有上下文后，可以通过这些属性查询、添加（使用 Add 或 Attach 方法）或在上下文中删除（使用 Remove）实体。 访问上下文对象上的 DbSet 属性表示一个启动查询，该查询返回指定类型的所有实体。 
  请注意，仅访问属性不会执行查询。 执行以下操作时执行查询：
    foreach (C#) 或 For Each (Visual Basic) 语句枚举对象。
    它通过集合操作（如 ToArray、ToDictionary或 ToList）进行枚举。
    在查询的最外面部分指定 LINQ 运算符，例如 First 或 Any。
    如果在上下文中未找到具有指定键的实体，则调用以下方法之一： Load 扩展方法 DbEntityEntry.Reload、Database.ExecuteSqlCommand和 DbSet<T>.Find。、
 */