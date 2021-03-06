﻿## JavaScript 入门学习

### 语句; （虽然分号“;”也可以不写）

```js
alert('hello!')
document.write('hello!')

//  单行注释，在注释内容前加符号 '//'
/*
	多行注释
*/
```

### 变量：

`var 变量名`

1. 变量必须使用字母、下划线'\_'或者美元符'\$'开始。
2. 然后可以使用任意多个英文字母、数字、下划线'\_'或者美元符'\$'组成。
3. 不能使用 JavaScript 关键词与 JavaScript 保留字。
4. 变量要先声明再赋值
5. 注：
   1. 在 JS 中区分大小写
   2. 要先声明，后使用. 变量虽然也可以不声明，直接使用，但不规范
   3. 函数内部声明变量的时候，一定要使用 var 命令。如不用则声明为全局变量！

### 判断语句：

```js
if (条件) {
  // 条件成立时执行的代码
} else {
  // 条件不成立时执行的代码
}
```

### 函数：

```js
function 函数名() {
  // 函数代码
}
```

### 警告（alert 消息对话框）

`alert(字符串或变量);`  
输出内容（document.write）

1. 输出内容用""括起，直接输出""号内的内容。  
   `document.write("I love JavaScript！");`
2. 通过变量，输出内容。
   `document.write(mystr);`
3. 输出多项内容，内容之间用+号连接。  
   `document.write(mystr+"I love JavaScript");`
4. 输出 HTML 标签，并起作用，标签使用""括起来。  
   `document.write(mystr+"<br>");`// 最后输出换行符

### 确认（confirm 消息对话框）

`confirm(str);`  
 str：在消息对话框中要显示的文本
返回值: Boolean 值

### 提问（prompt 消息对话框）

`prompt(str1, str2);`参数可不填  
 str1: 要显示在消息对话框中的文本，不可修改  
 str2：文本框中的内容，可以修改  
 返回值:

1. 点击确定按钮，文本框中的内容将作为函数返回值
2. 点击取消按钮，将返回 null

### 打开新窗口（window.open） open() 方法可以查找一个已经存在或者新建的浏览器窗口。

`window.open([URL], [窗口名称], [参数字符串])`  
 URL：可选参数，在窗口中要显示网页的网址或路径。如果省略这个参数，或者它的值是空字符串，那么窗口就不显示任何文档。
窗口名称：可选参数，被打开窗口的名称。

1. 该名称由字母、数字和下划线字符组成。
2. "\_top"、"\_blank"、"\_self"具有特殊意义的名称。
   \_blank：在新窗口显示目标网页
   \_self：在当前窗口显示目标网页
   \_top：框架网页中在上部窗口中显示目标网页
3. 相同 name 的窗口只能创建一个，要想创建多个窗口则 name 不能相同。
4. name 不能包含有空格。
   参数字符串：可选参数，设置窗口参数，各参数用逗号隔开。例：`'width=600,height=400,top=100,left=0'`

### 关闭窗口（window.close）

`window.close();`//关闭本窗口
`<窗口对象>.close();`//关闭指定的窗口

### 认识 DOM （Document Object Model）定义访问和处理 HTML 文档的标准方法。

1. 元素节点：上图中`<html>、<body>、<p>`等都是元素节点，即标签。
2. 文本节点:向用户展示的内容，如`<li>...</li>`中的 JavaScript、DOM、CSS 等文本。
3. 属性节点:元素属性，如`<a>`标签的链接属性 `href="http://www.imooc.com"`。
   `<a href="http://www.imooc.com">JavaScript DOM</a>`

### 通过 ID 获取元素

`document.getElementById(“id”)`
注:获取的元素是一个对象，如想对元素进行操作，我们要通过它的属性或方法。
innerHTML 属性用于获取或替换 HTML 元素的内容。
`Object.innerHTML`

1. Object 是获取的元素对象，如通过 document.getElementById("ID")获取的元素。
2. 注意书写，innerHTML 区分大小写。

### 改变 HTML 样式

`Object.style.property=new style;`  
注意: Object 是获取的元素对象，如通过 `document.getElementById("id")`获取的元素。  
property 是 CSS ，如： color,backgroundColor...

```html
<p id="pcon">Hello World!</p>
<script>
  var mychar = document.getElementById('pcon')
  mychar.style.color = 'red'
  mychar.style.fontSize = '20'
  mychar.style.backgroundColor = 'blue'
</script>
```

### 显示和隐藏（display 属性）

`Object.style.display = value`  
value: none 隐藏， block 显示， 要用"none",引号！  
注意:  
控制类名（className 属性）设置或返回元素的 class 属性。  
`object.className = classname`  
作用:

1. 获取元素的 class 属性
2. 为网页内的某个元素指定一个 css 样式来更改该元素的外观
