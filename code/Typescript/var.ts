// 类型注解 
// 在变量、声明的后面立即加上冒号 :
// 类型注释应使用小写，而不是使用首字母大写的JavaScript的衍生类型

// 字符串注解
const XXX: string = 'string type'
// 布尔值注解
let true_or_false: boolean = false
// 函数参数类型注解
function params(value: string) {
  console.log(value) // 返回string类型
}
// 函数返回值类型注解
function returnValue(): string {
  return 'value is stirng'
}

// number TypeScript里的所有数字都是浮点数
// TS和JS一样，没有区分数字类型（如Int，Long）
// 整数，需使用
Number.parseInt()

// 数组
// 元素类型后面接上 []，表示由此类型元素组成的一个数组
let list1: number[] = [1, 2, 3];
// 第二种方式是使用数组泛型，Array<元素类型>：
let list2: Array<number> = [1, 2, 3];

// 元组 Tuple
// 表示一个已知元素数量和类型的数组，各元素的类型不必相同
// 声明一个元组
let x: [string, number];
// 将其初始化
x = ['hello', 10]; // OK
// 将其错误地初始化
x = [10, 'hello']; // Error
// 当访问一个已知索引的元素，会得到正确的类型：

console.log(x[0].substr(1)); // OK
console.log(x[1].substr(1)); // Error, 'number'类型没有'substr'方法

// 枚举 enum类型
// 一组数值赋予友好的名字
enum Color { Red, Green, Blue }
let c: Color = Color.Green;

// 默认情况下，从0开始为元素编号。 
// 你也可以手动的指定成员的数值。 例如，我们将上面的例子改成从 1开始编号：
enum Color { Red = 1, Green, Blue }
// 或者，全部都采用手动赋值：
enum Color { Red = 1, Green = 2, Blue = 4 }

Any
// 不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查
Void
// 某种程度上来说，void类型像是与any类型相反，它表示没有任何类型
Object
// object表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型
declare function create(o: object | null): void;

// 类型	    例子
// 基本类型	
boolean	    x: boolean = false
number	    x: number = 10
string	    x: string = '10'
undefined	  x: undefined = undefined
null	      x: null = null
// 引用类型以及其他类型	
object	    x: object = { age: '14', name: 'John' }
array	      x: array = [1, '2', 3.0]
function x: function = (args) => { console.log(args) }
symbol	    x: symbol = Symbol('id')
// TypeScript 补充类型	
any	        x: any = null
never	      function error(msg): never => { throw new Error(msg) }
enum	      enum Color { Red = 1, Green, Blue }
tuple	      x: [string, number] = ['name', 12]

// 访问/设置对象的属性和方法
const person = {
  age: 18,
  name: 'zx'
}
person.age
person['age']
// 设置成员并不意味着你只能更新已经存在的属性的值，你完全可以创建新的成员，尝试以下代码：
person.farewell = function () { alert("Bye everybody!") }

// 变量解构
let input = [1, 2]
let [first, second] = input

// 你可以在数组里使用...语法创建剩余变量：
let [first, ...rest] = [1, 2, 3, 4]
console.log(rest) //  [2,3,4]
let [, second, , fourth] = [1, 2, 3, 4]

let o = {
  a: "foo",
  b: 12,
  c: "bar"
};
let { a, b } = o;
let { a: newName1, b: newName2 } = o  // 可以给属性以不同的名字：

// 正确
let { a, b }: { a: string, b: number } = o;
// 错误
let { a: n1, b: n2 }: { n1: string, n2: number } = o;

// 默认值可以让你在属性为 undefined 时使用缺省值：
function keepWholeObject(wholeObject: { a: string, b?: number }) {
  let { a, b = 1001 } = wholeObject;
}

// 函数声明
type C = { a: string, b?: number }
// 普通写法
function f(C) {
  // ...
}
// 解构
function f({ a, b }: C): void {
  // ...
}