
/**

*/
(function(){
    // 函数声明，可以整个模块使用
    function abc(){
        //
    }

    // 函数表达式， 只能在这以后调用此函数。推荐用这种方式定义函数！！！
    var f1 = function(){

    }
})()

//  js中(function(){…})()立即执行函数写法理解
/**
 * 函数声明、函数表达式、匿名函数
 *  函数声明：   function fnName () {…};
 *  函数表达式:  var fnName = function () {…};
 *  匿名函数：   function () {};
 */

fnName();
function fnName(){
    //...
}//正常，因为‘提升’了函数声明，函数调用可在函数声明之前

var fnName=function(){
    alert('Hello World');
}();//函数表达式后面加括号，当javascript引擎解析到此处时能立即调用函数

function fnName(){
    alert('Hello World');
}();//语法错误，Uncaught SyntaxError: Unexpected token ),这个函数会被js引擎解析为两部分：
    //1.函数声明 function fnName(){ alert('Hello World'); } 
    //2.分组表达式 () 但是第二部分作为分组表达式语法出现了错误，因为括号内没有表达式，把“()”改为“(1)”就不会报错
    //但是这么做没有任何意义，只不过不会报错,分组表达式请见:
    //分组中的函数表达式http://www.nowamagic.net/librarys/veda/detail/1664

function(){
    console.log('Hello World');    
}();//语法错误，Uncaught SyntaxError: Unexpected token (


    function(a){
	    console.log(a);   //报错,Uncaught SyntaxError: Unexpected token (
}(12);
(function(a){
    console.log(a);   //firebug输出123,使用（）运算符
})(123);
 
(function(a){
    console.log(a);   //firebug输出1234，使用（）运算符
}(1234));
 
!function(a){
    console.log(a);   //firebug输出12345,使用！运算符
}(12345);
 
+function(a){
    console.log(a);   //firebug输出123456,使用+运算符
}(123456);
 
-function(a){
    console.log(a);   //firebug输出1234567,使用-运算符
}(1234567);
 
var fn=function(a){
    console.log(a);   //firebug输出12345678，使用=运算符
}(12345678)           
//需要注意的是:这么写只是一个赋值语句,即把函数匿名函数function(a){...}()的返回值赋值给了fn,如果函数没有返回值,那么fn为undefined,
//下面给出2个例子,用来解答读者的疑惑:
var fn=function(a){
    console.log(a);   //firebug输出12345678，使用=运算符
}(12345678);
console.info(fn);//控制台显示为undefined;
fn(123);//函数未定义报错,fn is undefiend 

var fn=function(a){
    console.log(a);   //firebug输出12345678，使用=运算符
    return 111;
}(12345678);
console.info(fn);//会发现fn就是一个返回值111,而不是一个函数
fn(123);//报错,因为fn不是一个函数

可以看到输出结果，在function前面加！、+、 -甚至是逗号等到都可以起到函数定义后立即执行的效果，
    而（）、！、+、-、=等运算符，都将函数声明转换成函数表达式，消除了javascript引擎识别函数表达式和函数声明的歧义，告诉javascript引擎这是一个函数表达式，不是函数声明，
        可以在后面加括号，并立即执行函数的代码。
        加括号是最安全的做法，因为！、+、-等运算符还会和函数的返回值进行运算，有时造成不必要的麻烦。

        这样的写法有什么用:
        javascript中没用私有作用域的概念，如果在多人开发的项目上，你在全局或局部作用域中声明了一些变量，可能会被其他人不小心用同名的变量给覆盖掉，根据javascript函数作用域链的特性，可以使用这种技术可以模仿一个私有作用域，用匿名函数作为一个“容器”，“容器”内部可以访问外部的变量，而外部环境不能访问“容器”内部的变量，
            所以( function(){…} )()内部定义的变量不会和外部的变量发生冲突，
            俗称“匿名包裹器”或“命名空间”。
