/**
 * 当正则表达式使用 "g" 标志时，可以多次执行 exec 方法来查找同一个字符串中的成功匹配
 *  查找将从正则表达式的 lastIndex 属性指定的位置开始
 */
const myRe = /ab*/g
const str = 'abbcdefabh'
let myArray
while ((myArray = myRe.exec(str)) !== null) {
  var msg = 'Found ' + myArray[0] + '. '
  msg += 'Next match starts at ' + myRe.lastIndex
  console.log(msg)
}

myRe.lastIndex	// 下一次匹配开始的位置

myArray[0]  // 匹配的全部字符串
myArray[1]  // 1--n 括号中的分组捕获
myArray.index  // 匹配到的字符位于原始字符串的基于0的索引值
myArray.input  // 原始字符串