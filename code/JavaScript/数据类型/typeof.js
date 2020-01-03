// 返回的结果用该类型的字符串(全小写字母)形式表示，包括以下 7 种：
// number、boolean、symbol、string、
// object、undefined、function
typeof undefined //undefined 有效
typeof null // 'object'
typeof new Date() //object 无效
typeof new RegExp() //object 无效
typeof []  //object 无效

// null 有属于自己的数据类型 Null
// 引用类型也称为复杂类型,其值存储在堆(heap)中，而存储在变量处的值，是一个指针
// 引用类型除 Object 外，还包括 :
// Function 、Array、RegExp、Date 、Null

// instanceof 检测的是原型
[] instanceof Array         // true
{} instanceof Object        // true
new Date() instanceof Date  // true
[] instanceof Object        // true

[].__proto__ -> Array.prototype
  Array.prototype.__proto__ ->  Object.prototype
      Object.prototype.__proto__  ->  Null

// instanceof 只能用来判断两个对象是否属于实例关系， 
// 而不能判断一个对象实例具体属于哪种类型。

Array.isArray() 

// toString() 是 Object 的原型方法，调用该方法，默认返回当前对象的 [[Class]] 。这是一个内部属性，
// 其格式为 [object Xxx] ，其中 Xxx 就是对象的类型。

// 对于 Object 对象，直接调用 toString()  就能返回 [object Object] 
const o={a:1,b:'str'}
o.toString()  //  "[object Object]"

// 而对于其他对象，则需要通过 call / apply 来调用才能返回正确的类型信息
Object.prototype.toString.call('')          // [object String]
Object.prototype.toString.call(1)           // [object Number]
Object.prototype.toString.call(true)        // [object Boolean]
Object.prototype.toString.call(Symbol())    // [object Symbol]
Object.prototype.toString.call(undefined)   // [object Undefined]
Object.prototype.toString.call(null)        // [object Null]
Object.prototype.toString.call(new Function())// [object Function]
Object.prototype.toString.call(new Date())  // [object Date]
Object.prototype.toString.call([])          // [object Array]
Object.prototype.toString.call(new RegExp())// [object RegExp]
Object.prototype.toString.call(new Error()) // [object Error]
Object.prototype.toString.call(document)    // [object HTMLDocument]
Object.prototype.toString.call(window)      // [object global] window 是全局对象 global 的引用

const class2type = {}
"Boolean Number String Function Array Date RegExp Object Error"
  .split(" ")
  .forEach(function(e,i){
    class2type[ "[object " + e + "]" ] = e.toLowerCase()
})
//当然为了兼容IE低版本，forEach需要一个polyfill，不作细谈了。
function _typeof(obj){
    if ( obj == null ){
        return String( obj );
    }
    return typeof obj === "object" || typeof obj === "function" 
      ? class2type[ class2type.toString.call(obj) ] || "object" 
      : typeof obj
}
// nodejs
const util = require("util")

util.types.isDate(new Date())  // true
util.types.isRegExp(/abc/)  // true
util.types.isSet(new Set())  // true
util.types.isMap(new Map())  // true
// isObject()
if(value !== null && typeof value === 'object') {}