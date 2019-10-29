// Mongodb类型转换接口

//string转为double类型
db.law.find().forEach(function(x) {
  x.state = parseInt(x.state)
  db.law.save(x)
})
// 使用 $set 来设置数字时需要注意，mongo shell 默认会把所有数字类型的值转换成浮点型，如果你需要
// 插入整形，你需要用 NumberInt() 或 NumberLong() 来代替。

//string转为int类型
db.law.find().forEach(function(x) {
  x.ise = NumberInt(x.ise)
  db.law.save(x)
})

db.law.find().forEach(x => {
  x.ise = +x.ise
  db.law.save(x)
})
//string转化为date类型
db.law.find().forEach(function(x) {
  x.eift = new ISODate(x.eift)
  db.law.save(x)
})

/**
运行以下命令：
db.文档.find({"列":{$type:Type Number}}).forEach(
function(x){
x.列=new NumberInt(x.列);
db.文档.save(x);
}
);

Type Number Type Explanation
1 Double 浮点型
2 String UTF-8字符串都可表示为字符串类型的数据
3 Object 对象，嵌套另外的文档
4 Array 值的集合或者列表可以表示成数组
5 Binary data 二进制
7 Object id 对象id是文档的12字节的唯一 ID 系统默认会自动生成
8 Boolean 布尔类型有两个值TRUE和FALSE
9 Date 日期类型存储的是从标准纪元开始的毫秒数。不存储时区
10 Null 用于表示空值或者不存在的字段
11 Regular expression 采用js 的正则表达式语法
13 JavaScript code 可以存放Javasript 代码
14 Symbol 符号
15 JavaScript code with scope
16 32-bit integer 32位整数类型
17 Timestamp 特殊语义的时间戳数据类型
18 64-bit integer 64位整数类型
 */
