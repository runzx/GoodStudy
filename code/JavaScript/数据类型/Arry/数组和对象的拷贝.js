// javascript 数组以及对象的深拷贝（复制数组或复制对象

// 1。 在js中，数组和对象的复制如果使用=号来进行复制，那只是浅拷贝
//   相当于只拷贝了数组或对象的指针

// 2。 数组的深拷贝
//   1) for 循环
const arrCopy = arr => {
  const tmp = []
  for (let i = 0; i < arr.length; i++) {
    tmp.push(arr[i])
  }
  return tmp
}
// 2) slice 方法
// 只要设置为抽离全部，即可完成数组的深拷贝
const arr = [1, 2, 3, 4, 5]
const arr2 = arr.slice(0)
// 3) concat 方法
// 它是用于连接多个数组组成一个新的数组的方法
// 只要连接它自己，即可完成数组的深拷贝
const arr = [1, 2, 3, 4, 5]
const arr2 = arr.concat(0)
// 4) ES6扩展运算符
// 用下面的方法实现数组的深拷贝是最简单的 !!!
const arr = [1, 2, 3, 4, 5]
const [...arr2] = arr
// 3. 对象的深拷贝
// 1) 万能的for循环     // for in
function copyObj(obj) {
  const res = {}
  for (let key in obj) {
    res[key] = obj[key]
  }
  return res
}
// 2) 转换成json再转换成对象
const obj2 = JSON.parse(JSON.stringify(obj))
// 3) ES6扩展运算符 简单粗暴！！
const { ...obj2 } = obj // obj2为新生成对象
