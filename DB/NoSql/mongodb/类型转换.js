// Mongodb类型转换接口

//string转为double类型
db.law.find().forEach(function (x) {
    x.state = parseInt(x.state);
    db.law.save(x);
});
// 使用 $set 来设置数字时需要注意，mongo shell 默认会把所有数字类型的值转换成浮点型，如果你需要插入整形，你需要用 NumberInt() 或 NumberLong() 来代替。

//string转为int类型
db.law.find().forEach(function (x) {
    x.ise = NumberInt(x.ise);
    db.law.save(x);
});

//string转化为date类型
db.law.find().forEach(function (x) {
    x.eift = new ISODate(x.eift);
    db.law.save(x);
});
