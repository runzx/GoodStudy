## path.join 和 path.resolve 的区别

join 相当于把路径字符串按照规则连接起来。并不关心路径本身是否是绝对路径。

resolve 本意是解析，就是尝试搜索，并且返回的是绝对地址。  
path.resolve(a, b, c)等价于 cd $a && cd $b && cd \$c。
resolve 把 '/' 当成根目录

```js
//  当前工作目录为 /home/zx
path.join('/a', '/b') // /a/b
path.resolve('/a', '/b') // /b <=> cd /a && cd /b
path.resolve('a', 'b1', '..', 'b2') // /home/zx/a/b2
```
