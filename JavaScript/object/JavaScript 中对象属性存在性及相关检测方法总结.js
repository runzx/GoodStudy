JavaScript 中对象属性存在性及相关检测方法总结
// in
// 是 该操作会检查属性在对象本身及其[[prototype]]原型链中是否存在。
// 否 该操作会检查对象本身及其[[prototype]]原型链上的所有属性，无论其是否可枚举。
// in检查的是属性名，而非属性值
var obj = {
  name: "Bob",
  age: 24
};
("name" in obj); //true
("sex" in obj); //false

obj.hasOwnProperty(attr)
// 否 该操作仅会检查属性在对象本身是否存在，不会检查其[[prototype]]原型链
// 否 该操作会检查属对象本身上的所有属性，无论其是否可枚举。
var obj = {
  name: "Bob",
  age: 24
};
obj.hasOwnProperty("name"); //true
obj.hasOwnProperty("sex"); //false

for (var k in obj) 循环
// 是 该操作会检查属性在对象本身及其[[prototype]]原型链中是否存在。
// 是 该操作仅会检查对象本身及其[[prototype]]原型链上的所有可枚举属性
// 不要在数组上运用这种for(var k in obj)循环，因为这种枚举不仅会包含所有数值索引，还会包含所有可枚举属性，可能会产生一些问题。
var obj = {
  name: "Bob",
  age: 24
};
var pro = {
  sex: "m"
};
obj.__proto__ = pro;
//name Bob
//age 24
//sex m

obj.propertyIsEnumerable
// 否 该操作仅会检查属性在对象本身是否存在，不会检查其[[prototype]]原型链。
// 是 从名字容易看出，属性必须满足enumerable:true
var obj = {
  name: "Bob",
  age: 24
};
var pro = {
  sex: "m"
};
Object.defineProperty(obj, "own", {
  enumerable: false,
  value: 5
});
obj.__proto__ = pro;
obj.propertyIsEnumerable("name"); //true
obj.propertyIsEnumerable("sex"); //false
obj.propertyIsEnumerable("own");  //false

Object.getOwnPropertyNames(obj)
// 否 该操作仅会检查属性在对象本身是否存在，不会检查其[[prototype]]原型链。
// 否 该操作会检查属对象本身上的所有属性，无论其是否可枚举。

Object.keys(obj)
// 否 该操作仅会检查属性在对象本身是否存在，不会检查其[[prototype]]原型链。
// 是 该操作仅会检查对象本身上的所有可枚举属性