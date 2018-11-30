// js-cookie
// Cookie是网站设计者放置在客户端的小文本文件，一般后台语言使用的比较多，可以实现用户个性化的一些需求。js-cookie插件是一个JS操作cookie的插件，源文件只有3.34 KB，非常轻量级。js-cookie也支持npm和Bower安装和管理

// a、设置cookie

Cookies.set('name', 'value', { expires: 7, path: '' });//7天过期

Cookies.set('name', { foo: 'bar' });//设置一个json

// b、读取cookie

Cookies.get('name');//获取cookie

Cookies.get(); #读取所有的cookie

// c、删除cookie

Cookies.remove('name'); #删除cookie时必须是同一个路径。

// 15分钟
var inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
Cookies.set('foo', 'bar', {
    expires: inFifteenMinutes
});

// half a day (12 hours):
var inHalfADay = 0.5;
Cookies.set('foo', 'bar', {
    expires: inHalfADay
});

// Or in 30 minutes:
var in30Minutes = 1/48;
Cookies.set('foo', 'bar', {
    expires: in30Minutes
});