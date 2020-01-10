// obj.property.enumerable

// 对于通过直接的赋值和属性初始化的属性，该标识值默认为即为 true，
// 对于通过 Object.defineProperty 等定义的属性，该标识值默认为 false。
// 基本包装类型 的 原型属性 是 不可枚举 , 如Object, Array, Number

const obj = { a: 1, b: 'abc' }
const arr = [42]

obj.propertyIsEnumerable('a') // true

arr.propertyIsEnumerable(0) //true
arr.propertyIsEnumerable('length') // false

// 1
// returns an array of a given object's own enumerable property names
let objAllPro = Object.keys(obj) // ['a','b']

// 2  * for..in循环
for (const prop in obj) {
  console.log(prop)
} // a  b

// 3  * JSON.stringify方法
objAllPro = JSON.stringify(obj) //  '{"a":1,"b":"abc"}'
