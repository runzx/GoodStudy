
Decorator 中文名是装饰器，核心功能是可以通过外部包装的方式，直接修改类的内部属性。

1. Class Decorator
    const classDecorator = (target: any) => {
        const keys = Object.getOwnPropertyNames(target.prototype)
        console.log('classA keys,', keys) // classA keys ["constructor", "sayName"]
    }

    @classDecorator
    class A {
        sayName() {
            console.log('classA ascoders')
        }
    }
    const a = new A()
    a.sayName() // classA ascoders

2. 
    @decorator
    class A {}

    // 等同于

    class A {}
    A = decorator(A) || A;

    修饰器函数的第一个参数，就是所要修饰的目标类。
    一个参数不够用，可以在修饰器外面再封装一层函数。
        function testable(isTestable) {
            return function(target) {
                    target.isTestable = isTestable;
            }
        }

        @testable(true)
        class MyTestableClass {}
        MyTestableClass.isTestable // true
        修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，修饰器能在编译阶段运行代码。也就是说，
            修饰器本质就是编译时执行的函数。
            存在函数提升，使得修饰器不能用于函数
