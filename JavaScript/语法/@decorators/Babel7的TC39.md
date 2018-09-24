
# 与装饰器的元编程Metaprogramming    // tc39
以前,JavaScript中的元编程是通过使用操纵JavaScript对象的动态操作来驱动的,例如```Object.defineProperty```.  ESnext使用装饰器升级类,具有以下优点:  
  用户编写类文字并 显式 注释 正在被操作的源代码片段,而不是将大对象传递到特殊的依赖于应用程序的类框架中的怪异动作.  
  装饰器可以操作 私有 字段和 私有 方法,而对象上的操作则无法操纵私有名称的定义.  
  装饰器在 定义类时 进行操作,而不是在创建和使用实例时进行操作,因此它们可能会导致
    更适合高效 实现的模式.  
  装饰器可用于装饰 整个类或 单个类元素(字段或方法:field or method).

## 基本用法
  装饰器被实现为函数,它们将类元素的类似JSON的表示作为参数,并返回其可能修改的形式,可选地具有附加的类元素.  
  例如,假设我们想要一个简单的装饰器来更改属性的位置,以便在原型而不是实例上创建它:
```JS
    class Demo {
      @prototypeProp
      x = 1
    }
```
  x上面的公共字段将表示为以下类元素描述符(class element descriptor),它将被传递到我们的装饰器函数中:
```JS
    {
      kind: "field"
      key: "x",
      placement: "own",
      // property descriptor for Object.defineProperty
      descriptor: { configurable: false, enumerable: true, writable: true },
      initializer: () => 1
    }
```
  要实现我们的装饰器函数,我们需要获取类元素描述符并将其placement属性更改为'prototype':
```JS
    function prototypeProp(elementDescriptor) {
      assert(elementDescriptor.kind == "field" || elementDescriptor.kind == "method");
      // 注意:这个装饰器通常用于字段,而不是方法,因为 Note: this decorator would generally be used for fields, not methods, because the
      // '原型'放置已经是非静态方法的默认位置.所以它只会 'prototype' placement is already the default for non-static methods. So it would only
      // 如果你想覆盖默认放置或放置是有用的方法 be useful for methods if you wanted to override the default placement or the placement
      // 从以前的装饰. from a previous decorator.
      return {
        ...elementDescriptor,
        placement: 'prototype'
      }
    }
```
  感谢prototypeProp装饰器,x现在将放置在原型上,就像我们编写了以下代码一样:
  ```JS
    class Demo {}
    Demo.prototype.x = 1
```
  装饰器相当于：  
  ```js
  Demo = prototypeProp(Demo) || Demo  // 编译时就执行的替换
  ```
## API
  不同类型的装饰器功能的签名如下:

### Field装饰
  参数
    具有以下属性的类元素描述符:
```JS
    {
      kind: "field"
      key: String, Symbol or Private Name,
      placement: "static", "prototype"原型 or "own",
      descriptor: Property Descriptor属性描述符 (argument to Object.defineProperty),
      initializer: A method used to set the initial state of the field
    }
```
    对于私有字段或访问者,key它将是一个私有名称 - 这类似于字符串或符号,除了它与使用属性访问[]或使用诸如的操作无效Object.defineProperty.相反,它只能与装饰器一起使用.

  返回  
    具有以下属性的类元素描述符(可选属性用以表示?):
    ```{ kind, key, placement, descriptor, initializer, extras?, finisher? }```
  可选的附加属性:  
    extras:具有其他类元素的属性  
    finisher:在类创建结束时调用的回调(在整个类的整理器之前,如果存在的话)
### 方法装饰器
  参数  
    具有以下属性的类元素描述符:
```JS
    {
      kind: "method"
      key: String, Symbol or Private Name,
      placement: "static", "prototype" or "own",
      descriptor: Property Descriptor (argument to Object.defineProperty),
    }
```
  返回  
    具有以下属性的类元素描述符:
    ```{ kind, key, placement, descriptor, extras?, finisher? }```

### 类装饰器
  参数  
    具有以下属性的类描述符:
```JS
    {
      kind: "class"
      elements: Array of all class elements
    }
```
  返回  
    具有以下属性的类描述符:
```js
    {
      elements: Possibly modified class elements (can include additional class elements)
      constructor: (optional) The function which should act as the construtor
      finisher: (optional) A callback that is called at the end of class creation
    }
```


      元素:可以修改的类元素(可以包含其他类 元素)  
      构造函数 :( 可选)应该充当构造函数的函数  
      finisher :(可选)在类创建结束时调用的回调  
    注意:终结者finishers为每个类(在类创建时)运行一次,而不是每个实例运行一次.

### 例子
README.md中的三个装饰器可以定义如下:
```JS
// Define the class as a custom element with the given tag name
function defineElement(tagName) {
  // In order for a decorator to take an argument, it takes that argument
  // in the outer function and returns a different function that's called
  // when actually decorating the class (manual currying).
  return function(classDescriptor) {
    let { kind, elements } = classDescriptor;
    assert(kind == "class");
    return {
      kind,
      elements,
      // This callback is called once the class is otherwise fully defined
      finisher(klass) {
        window.customElements.define(tagName, klass);
      }
    };
  };
}

// Create a bound version of the method as a field
function bound(elementDescriptor) {
  let { kind, key, descriptor } = elementDescriptor;
  assert(kind == "method");
  let { value } = descriptor
  function initializer() {
    return value.bind(this);
  }
  // Return both the original method and a bound function field that calls the method.
  // (That way the original method will still exist on the prototype, avoiding
  // confusing side-effects.)
  let boundFieldDescriptor = { ...descriptor, value: undefined }
  return {
    ...elementDescriptor,
    extras: [
      { kind: "field", key, placement: "own", descriptor: boundFieldDescriptor, initializer }
    ]
  }
}

// Whenever a read or write is done to a field, call the render()
// method afterwards. Implement this by replacing the field with
// a getter/setter pair.
function observed({kind, key, placement, descriptor, initializer}) {
  assert(kind == "field");
  assert(placement == "own");
  // Create a new anonymous private name as a key for a class element
  let storage = PrivateName();
  let underlyingDescriptor = { enumerable: false, configurable: false, writable: true };
  let underlying = { kind, key: storage, placement, descriptor: underlyingDescriptor, initializer };
  return {
    kind: "method",
    key,
    placement,
    descriptor: {
      get() { return storage.get(this); },
      set(value) {
        storage.set(this, value);
        // Assume the @bound decorator was used on render
        window.requestAnimationFrame(this.render);
      },
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable
    },
    extras: [underlying]
  };
}

// There is no built-in PrivateName constructor, but a new private name can
// be constructed by extracting it from a throwaway class
function PrivateName() {
  let name;
  function extract({key}) { name = key; }
  class Throwaway { @extract #_; }
  return name;
}
```

```js
//使用给定标记名称
function defineElement(tagName){
   //为了使装饰器接受参数,它在外部函数中接受该参数
   //并返回一个名为/的不同函数/当实际装修班级(手动currying).
   return  return( classDescriptor){
      let {kind,elements} = classDescriptor;
      assert(kind == "class");
      return {
        kink,
        elements,
        //一旦该类完全定义了
        finisher( klass){
          window.customElements.define(tagName,klass);
        }
      };
  };
}

//创建方法的绑定版本作为字段
function bound( elementDescriptor){
   let {kind,key,descriptor} = elementDescriptor;
  assert (kind ==  " method ");
  let {value} = descriptor
   function  initializer(){
    return value.bind( this);
  }
  //返回原始方法和调用方法的绑定函数字段.
  //(这样原来的方法将仍然存在于原型,避免
  //.混乱副作用)
  let boundFieldDescriptor = { ...descriptor,value: undefind }
  return {
     ... elementDescriptor,
    extras: [   // 临时演员
      {kind : " field ",key,placement : " own ",descriptor : boundFieldDescriptor,initializer}
    ]
  }
}

//每当对字段进行读或写操作时,请在之后调用render()//方法.通过用
// getter / setter对替换字段来实现这一点.观察到的函数 
  function observed({kind,key,placement,descriptor,initializer}){
    assert(kind == "field");
    assert(placement == "own");
  //创建一个新的匿名私有名称作为类元素的键
  let storage = PrivateName();
  let underlyingDescriptor = {enumerable : false,
    configurable : false,writable : true };
  let underlying = {kind,key : storage,placement,
    descriptor : underlyingDescriptor,initializer};
  return {
    kink: "method",
    key,
    placement,    // 放置
    descriptor : {
      get(){ return storage.get(this); },
      set(value){
        storage.set(this,value);
        //假设在渲染@bound装饰器
        windows.requestAnimationFrame(this.render);
      },
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable
    },
    extras: [underlying]  // 额外的: [基础]
  };
}

//没有内置PrivateName构造,而是一个新的专用名称可以
//从暴殄天物类中提取出其构造
function PrivateName(){
  let name;
  function  extract({key}){name = key; }
  class Throwaway{@extract #_; }  //  丢掉
  return name;
}
```
关于@bound装饰者的注释
请参见bound-decorator-rationale.md