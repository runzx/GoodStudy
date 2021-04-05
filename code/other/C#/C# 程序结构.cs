/* 
  命名空间声明（Namespace declaration）
  一个 class
  Class 方法
  Class 属性
  一个 Main 方法
  语句（Statements）& 表达式（Expressions）
  注释

 */
using System; //  using 关键字用于在程序中包含 System 命名空间
namespace HelloWorldApplication
{
   class HelloWorld
   {
      static void Main(string[] args)
      {
         /* 我的第一个 C# 程序*/
         Console.WriteLine("Hello World");
         Console.ReadKey();
      }
   }
}
// 标识符必须以字母、下划线或 @ 开头，后面可以跟一系列的字母、数字（ 0 - 9 ）、下划线（ _ ）、@。