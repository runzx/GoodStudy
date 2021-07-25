// 1。 Array.isArray()
const a = []
const b = {}
Array.isArray(a) //true
Array.isArray(b) //false

// 2。instanceof
console.log(a instanceof Array) //true
console.log(a instanceof Object) //true,在数组的原型链上也能找到Object构造函数
console.log(b instanceof Array) //false

// prototype属性，不像每个对象都有__proto__属性来标识自己所继承的原型，
// 只有函数才有prototype属性。
const arr = []
if (arr.__proto__ === Array.prototype) console.log('this is array')

const isArray = obj => {
  return obj.__proto__ === Array.prototype
}
