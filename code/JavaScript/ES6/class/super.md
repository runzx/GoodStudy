## super

1. super 关键字用于访问和调用一个对象的父对象上的函数  
2. super.prop和super[expr]表达式在类和对象字面量任何方法定义中都是有效的  
3. super.name='zx' 可以执行,但不能读出内容 console.log(super.name)报错！this.name 能取出值  
4. 在构造函数中使用时，super关键字将单独出现，并且必须在使用this关键字之前使用  

## 语法
`super([arguments]);`   
// 调用 父对象/父类 的构造函数  

`super.functionOnParent([arguments]);`   
// 调用 父对象/父类 上的方法  

5. 不写constructor(){}, 系统默认生成：
```js
constructor(...args) {
  super(...args);
}
```

6. 能从父类中访问子类的方法或属性