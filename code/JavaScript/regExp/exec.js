// 在设置了 global 或 sticky 标志位的情况下
//  （如 /foo/g or /foo/y），
// JavaScript RegExp 对象是有状态的。
// 他们会将上次成功匹配后的位置记录在 lastIndex 属性中。


const myRe = /[-·\w\u4e00-\u9fa5]+/g
// "g" 标志时，可以多次执行 exec 方法来查找同一个字符串中的成功匹配
//      查找将从正则表达式的 lastIndex 属性指定的位置开始
//      即使再次查找的字符串不是原查找字符串时，lastIndex 也不会被重置，它依旧会从记录的 lastIndex 开始。
const str = '红魔·雷=🐶zy 翟享&mm 子墨-翟'
let arr
while (arr = myRe.exec(str)) {
  console.log('arr:', arr)
  const [name] = arr
  console.log('name:', name)
}
