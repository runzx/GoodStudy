// alert('hello,zhaix')

@testable
@annotation
class Pepol{
  static age=100  // 静态属性
  // 装饰器不支持static private
  static #sex='男'  //静态 Static private fields
  // instanceProperty = "bork" // 实例属性
  constructor(name){
    this.name=name
  }
  #age1 = 19  // 私有实例属性

  #increaseAge() {
    this.#age1++
  }

  getName(){
    return this.name
  }
  getSex(){
    return Pepol.#sex
  }
  static getSex1(){
    return Pepol.#sex
  }
  setAge(){
    this.#increaseAge()
    console.log(this.#age1)
    console.log(Pepol.age)
  }
}

function annotation(target) {
  target.annotated = 'hello'
}
function testable(target) {
  target.prototype.isTestable = true
}
@isTestable('aaa')
@annotation
class MyClass { }


function isTestable(value) {
  return function decorator(target) {
     target.isTestable = value;
  }
}
const zx=new Pepol('翟享')
alert(zx.getName())
alert(zx.isTestable)
alert(MyClass.isTestable)
console.log(MyClass.annotated)
console.log(Pepol)
console.log(Pepol.age)
alert(zx.getSex())
console.log(Pepol.getSex1())
zx.setAge()
alert()
// Pepol.age=300
// alert(Pepol.age)
// alert(zx.instanceProperty)
