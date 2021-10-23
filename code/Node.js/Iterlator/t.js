// Iterator ES6 迭代器
// console.log([][Symbol.iterator]())
// console.log((new Map())[Symbol.iterator]())
// console.log((new Set())[Symbol.iterator]())

// Array、Set、Map 这些数据结构默认具有 Symbol.iterator 属性
// Object 类型 没有
// 字符串、arguments 对象、DOM 的 NodeList 对象

const str = 'nodejs'
console.log(str[Symbol.iterator]()) // Object [String Iterator] {}

for (const val of str) {
  console.log(val) // n o d e j s
}


// Symbol.iterator 方法会返回一个迭代器对象
// 它的接口中有一个 next 方法
// 方法返回 value 和 done 两个属性
// done 属性表示遍历是否结束

const arr = ['N', 'o', 'd', 'e']
const iterator = arr[Symbol.iterator]()

console.log(iterator.next()) // { value: 'N', done: false }
console.log(iterator.next()) // { value: 'o', done: false }
console.log(iterator.next()) // { value: 'd', done: false }
console.log(iterator.next()) // { value: 'e', done: false }
console.log(iterator.next()) // { value: undefined, done: true }

// 数组、Set、Map 解构赋值时，会默认调用 Symbol.iterator 方法


// ES6 中的扩展运算符（...）也会默认调用数组、Set、Map 等结构的 Symbol.iterator 方法

// for...of 循环，该循环内部也会调用 Symbol.iterator 方法

console.log('str:', str)