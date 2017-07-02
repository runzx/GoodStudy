php中$this、static、final、const、self的用法
<?php
1. $this
    // 表示当前实例，在类的内部方法访问未声明为const及static的属性时，使用$this->
    // 对象的内部，让对象里的方法访问本对象的属性。
        $this->属性;
        $this->方法;
2. 在类里面调用当前类的属性和方法有三种方法，分别是self、parent、$this，这三个关键字的区别是：
    self    //用来指向当前的类；
    parent  //用于指向当前类的父类，可以使用该关键字调用父类的属性和方法；
    $this   //用来在类体内调用自身的属性和方法。
    
3. static 
    // 定义静态成员和定义静态方法
    // 静态成员只保留一个变量的值，这个值对所有实例都是有效的
    访问已经声明为const及static的属性时，需要使用
        self::$name     //的形式调用
    //const属性的申明格式是
        const PI=3.14
    // 类的方法是static的，他所访问的属性也必须是static的。
4. self
    //表示类本身，指向当前的类。通常用来访问类的静态成员、方法和常量。
        public function getPI(){ 
            return self::PI; 
        }
5. final
    //final 关键字来修饰了，那么这个被修饰的类或者方法将不能被扩展或者继承。
    //PHP 5 新增。如果父类中的方法被声明为 final，则子类无法覆盖该方法。如果一个类被声明为 final，则不能被继承。
        final class MyClass{}           //此类将不允许被继承
        final function fun1(){......}   //此方法将不允许被重写