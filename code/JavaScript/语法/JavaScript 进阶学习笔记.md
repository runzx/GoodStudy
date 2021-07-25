## JavaScript 进阶学习-------20170221---------------------

进一步的了解 JS 的变量、数组、函数、语法、对象、事件、DOM 操作，制作简单的网页动态效果。

1. JS 是区分大小写的，如：classname 和 ClassName 是不一样的。同时注意方法、属性、变量等的大小写吆。
2. JS 中的字符、符号等一定要在英文状态下输入吆。

### 引入 JS 外部文件的方式:

`<script src='script.js'></script>`

### 变量：

`var num1,mun2 ;`声明变量 num1、num2,变量也可以不声明，直接使用.  
错误:  
 6num //开头不能用数字  
 %sum //开头不能用除(_ \$)外特殊符号,如(% + /等)  
 sum+num //开头中间不能使用除(_ \$)外特殊符号，如(% + /等)

    字符串需要用一对引号""括起来
    '+'算术运算符主要用来完成类似加减乘除的工作，在JavaScript中，“+”不只代表加法，还可以连接两个字符串，

`mystring = "Java" + "Script";`mystring 值:'JavaScript'

```js
mynum = 10
mynum++ //mynum的值变为11
mynum-- //mynum的值又变回10
```

    "||"	逻辑或操作符
    "&&" 	逻辑与
    "!"		是逻辑非操作符

### 操作符之间的优先级（高到低）:

    算术操作符 → 比较操作符 → 逻辑操作符 → "="赋值符号
    如果同级的运算是按从左到右次序进行,多层括号由里向外。

### 创建数组语法：

```js
var myarray = new Array() //是空数组，没有值，如输出，则显示undefined
var myarray = new Array(8) //创建数组，存储8个数据。
// 指定长度,但实际上数组都是变长的，也就是说即使指定了长度为8，仍然可以将元素存储在规定长度以外
```

### 数组赋值

第一种方法：

`var myarray = new Array(66,80,90,77,59);`创建数组同时赋值

第二种方法：  
`var myarray = [66,80,90,77,59];`直接输入一个数组（称 “字面量数组”）

### 向数组增加一个新元素

只需使用下一个未用的索引，任何时刻可以不断向数组增加新元素。
数组属性 length

```js
myarray.length //获得数组 myarray 的长度
// JavaScript 数组的 length 属性是可变的：
arr.length = 10 //增大数组的长度
```

### 二维数组 array[][]

```js
myarr[0][1] //说明: 0 表示表的行，1 表示表的列
// 2维数组的定义方法2
var Myarr = [
  [0, 1, 2],
  [1, 2, 3]
]

for (var i = 0; i < arr.length; i++) {
  document.write(arr[i] + '<br>')
} //显示数组内容，br 为换行。	for语句要带{}
```

### switch(表达式)

```js
switch (value) {
  case value1:
    // 执行代码块 1
    break
  case value2:
    // 执行代码块 2
    break
  // ...
  case valuen:
    // 执行代码块 n
    break
  default:
  // 与 case value1 、 case value2...case valuen 不同时执行的代码
}
```

### 循环：

```js
// 初始化变量;循环条件;循环迭代
for (let i = 0; i < n; i++) {
  // 循环语句
}

//  反反复复(while循环)
while (boolen) {
  // 判断条件
  // 循环语句
}
//  来来回回(Do...while循环) 保证循环体至少被执行一次。

// 退出循环
break //在while、for、do...while、while循环中使用break语句退出当前循环，直接执行后面的代码
// 继续循环
continue // 仅仅跳过本次循环，而整个循环体继续执行
```

### 函数调用:

1. 在`<script>`标签内调用。  
   `add2();`//调用函数，直接写函数名。
2. 在 HTML 文件中调用，如通过点击按钮后调用定义好的函数。  
   `<input type="button" value="click it" onclick="add2()">` //按钮,onclick 点击事件，直接写函数名

### 事件：

    鼠标单击事件( onclick ）
    鼠标经过事件（onmouseover）
    鼠标移开事件（onmouseout）
    光标聚焦事件（onfocus）
    失焦事件（onblur）
    内容选中事件（onselect）	//当文本框或者文本域中的文字被选中时
    文本框内容改变事件（onchange）
    加载事件（onload）			//页面加载完成后，立即发生.可理解为打开一个新页面时。
    卸载事件（onunload）		//当用户退出页面时（页面关闭、页面刷新等）,注意：不同浏览器对onunload事件支持不同

### 对象

JavaScript 中的所有事物都是对象  
如:字符串、数值、数组、函数等，每个对象带有属性和方法。

    对象的属性：反映该对象某些特定的性质的，如：字符串的长度、图像的长宽等
    对象的方法：能够在对象上执行的动作。例如，表单的“提交”(Submit)，时间的“获取”(getYear)等；

Date 日期对象:

```js
var Udate = new Date() //有初始值：当前时间(当前电脑系统时间)。
var d = new Date(2012, 10, 1) //自定义初始值：2012年10月1日
var d = new Date('Oct 1, 2012') //2012年10月1日
d.getDay() // 返回星期，返回的是0-6的数字，0 表示星期天
`<script type="text/javascript">`
var mydate = new Date()
var weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
document.write('今天是：' + weekday[mydate.getDay()])

Y = mydate.getFullYear() + '-'
M = (mydate.getMonth() + 1 < 10 ? '0' + (mydate.getMonth() + 1) : mydate.getMonth() + 1) + '-'
D = mydate.getDate() + ' '
h = mydate.getHours() + ':'
m = mydate.getMinutes() + ':'
s = mydate.getSeconds()
console.log(Y + M + D + h + m + s) // 输出结果：2014-04-23 18:55:49 //呀麻碟
`</script>`

getTime() / setTime() // 返回/设置时间，单位毫秒数，计算从 1970 年 1 月 1 日零时到日期对象所指的日期的毫秒数。
```

### String 字符串对象

```js
stringObject.length //返回该字符串的长度。
mystr.toUpperCase() //小写字母转换为大写：
toLowerCase() //大写字母都变成小写
stringObject.charAt(index) //返回指定位置的字符
stringObject.indexOf() //返回某个指定的字符串值在字符串中首次出现的位置。
stringObject.split(separator, limit) //分割为字符串数组,如果把空字符串 ("") 用作 separator，那么 stringObject 中的每个字符之间都会被分割。
stringObject.substring(startPos, stopPos) //提取字符串中介于两个指定下标之间的字符。包含start位置的字符到 stop-1 处的所有字符
stringObject.substr(startPos, length) //startPos位置开始的指定数目的字符串。当startPos是负数时，从字符串的尾部开始算起的位置。
parseInt(string, radix) //函数可解析一个字符串，并返回一个整数
```

### Math 对象，提供对数据的数学计算

```js
Math.floor(x) //向下
Math.ceil(x) //向上取整
Math.round(x) //四舍五入
Math.random() //随机数
Math.round(x) //取整
// +=	x+=y	x=x+y
// -=	x-=y	x=x-y
// *=	x*=y	x=x*y
// /=	x/=y	x=x/y
// %=	x%=y	x=x%y
```

### 数组：

```js
arrayObject.concat(array1, array2, arrayN) //连接,返回一个新数组
arrayObject.join(分隔符) //把数组中的所有元素放入一个字符串。元素是通过指定的分隔符进行分隔的。
arrayObject.reverse() //颠倒数组中元素的顺序,改变原来的数组
arrayObject.slice(start, end) //从已有的数组中返回选定的元素,
arrayObject.sort(fn) //按照一定的顺序排列。
// 若返回值<=-1，则表示 A 在排序后的序列中出现在 B 之前。
// 若返回值>-1 && <1，则表示 A 和 B 具有相同的排序顺序。
// 若返回值>=1，则表示 A 在排序后的序列中出现在 B 之后
```

### window 对象

    	指当前的浏览器窗口,是BOM的核心

```js
// JavaScript 计时器
setTimeout(fn, times) //一次性计时器：仅在指定的延迟时间之后触发一次。
clearTimeout()
setInterval(fn, times) //间隔性触发计时器：以毫秒计
clearInterval(id_of_setInterval)

getElementByID, getElementsByName, getElementByTagName //区别
// 1. ID 是唯一的
// 2. Name 是标签的名字，可以重复。'table' 返回 表格数组
// 3. TagName可看似某类，获取相同类的集合

// 方法，通过元素节点的属性名称获取属性的值。
elementNode.getAttribute(name)
// 1. elementNode：使用getElementById()、getElementsByTagName()等方法，获取到的元素节点。
// 2. name：要想查询的元素节点的属性名字

//方法增加一个指定名称和值的新属性，或者把一个现有的属性设定为指定的值。
elementNode.setAttribute(name, value)
```

### 节点属性

在文档对象模型 (DOM) 中，每个节点都是一个对象。DOM 节点有三个重要的属性 ：

1. nodeName : 节点的名称
2. nodeValue ：节点的值
3. nodeType ：节点的类型

一、nodeName 属性: 节点的名称，是只读的。

1. 元素节点的 nodeName 与标签名相同
2. 属性节点的 nodeName 是属性的名称
3. 文本节点的 nodeName 永远是 #text
4. 文档节点的 nodeName 永远是 #document

二、nodeValue 属性：节点的值

1. 元素节点的 nodeValue 是 undefined 或 null
2. 文本节点的 nodeValue 是文本自身
3. 属性节点的 nodeValue 是属性的值

三、nodeType 属性: 节点的类型，是只读的。
以下常用的几种结点类型:
元素类型 |节点类型
--------|--------
元素 |1
属性 |2
文本 |3
注释 |8
文档 |9

访问选定元素节点下的所有子节点的列表，返回的值可以看作是一个数组，他具有 length 属性。

```js
elementNode.childNodes

elementNode.parentNode //父节点
nodeObject.nextSibling //兄弟节点
appendChild(newnode) //指定节点的最后一个子节点列表之后添加一个新的子节点。
insertBefore(newnode, node) //节点前插入一个新的子节点。
nodeObject.removeChild(node)
node.replaceChild(newnode, oldnew)
document.createElement(tagName)
document.createTextNode(data)

// 一、对于 IE9+、Chrome、Firefox、Opera 以及 Safari：

window.innerHeight // 浏览器窗口的内部高度
window.innerWidth // 浏览器窗口的内部宽度
```
