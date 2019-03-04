1。 Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，
数组中属性名的排列顺序和使用
for… in 循环遍历该对象时返回的顺序一致（ 两者的主要区别是 一个
for - in 循环还会枚举其原型链上的属性）。

2。只比较自身可枚举
function equals(x, y) {
  var f1 = x instanceof Object;
  var f2 = y instanceof Object;
  if (!f1 || !f2) {
    return x === y
  }
  if (Object.keys(x).length !== Object.keys(y).length) {
    return false
  }
  for (var p in x) {
    var a = x[p] instanceof Object;
    var b = y[p] instanceof Object;
    if (a && b) {
      equals(x[p], y[p])
    } else if (x[p] != y[p]) {
      return false;
    }
  }
  return true
}

3. for in 遍历原型链上的属性
function equals(x,y){
  var f1=x instanceof Object;
  var f2=y instanceof Object;
  if(!f1 || !f2){
      return x===y
  }
  if(Object.keys(x).length!== Object.keys(y).length){
      return false
  }
  for(var p in x){
      var a= x[p] instanceof Object; 
      var b= y[p] instanceof Object; 
      if(a && b){
          equals(x[p],y[p])
      }else if(x[p]!=y[p]){
          return false;
      }
  }
    return true;
}
