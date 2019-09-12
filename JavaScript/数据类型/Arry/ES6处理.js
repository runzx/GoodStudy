const arr1 = [1, 2, 3]
const arr2 = [3, 4, 5, 6]
// map
console.log(arr1.map(i => i * 2)) //  [2,4,6]

// filter
console.log(arr1.filter(i => i < 2)) // [1]

// concat 拼接数组
console.log([...arr1, ...arr2]) //  [ 1, 2, 3, 3, 4, 5, 6 ]

// 去重
console.log(new Set([...arr1, ...arr2])) // Set { 1, 2, 3, 4, 5, 6 }

console.log([...new Set([...arr1, ...arr2])]) // [ 1, 2, 3, 4, 5, 6 ]

// taobao首页有多少种标签？
new Set([...document.querySelectorAll('*')].map(i=>i.nodeName)).size

[...new Set([...document.querySelectorAll('*')].map(i=>i.nodeName))].length