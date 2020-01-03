// 1. ES6
arr.find(element => element.name == '李四')
let obj = arr.find(o => o.name === 'string 1')
// 2. 更高阶的功能，假设按’field’属性搜索：
var elementPos = array
  .map(function(x) {
    return x.id
  })
  .indexOf(idYourAreLookingFor)
var objectFound = array[elementPos]

// 3.遍历数组并测试该属性：
function search(nameKey, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].name === nameKey) {
      return myArray[i]
    }
  }
}
