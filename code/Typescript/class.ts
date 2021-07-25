class Greeter {
  // 属性
  greeting: string
  private name: string  // 不能在声明它的类的外部访问
  protected name2: string // 在派生类中仍然可以访问
  readonly numberOfLegs: number = 8 // 只读
  static baseRoute = '/basePath'  // 静态，这些属性存在于类本身上面而不是类的实例上
  
  // 构造函数
  constructor(message: string) {
    this.greeting = message
  }
  // 方法
  greet() {
    return "Hello, " + this.greeting;
  }
}

let greeter = new Greeter("world")

// 派生类包含了一个构造函数，它必须调用 super()，它会执行基类的构造函数
// 在TypeScript里，成员都默认为 public
// 派生类通常被称作 子类，基类通常被称作 超类或父类

// getters/setters来截取对对象成员的访问

// 抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化
// 不同于接口，抽象类可以包含成员的实现细节
// abstract关键字是用于定义抽象类和在抽象类内部定义抽象方法。
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log('roaming the earch...');
    }
}