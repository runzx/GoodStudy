const ObjectId = require('mongoose').Types.ObjectId;
ObjectId.isValid('microsoft123');//true
ObjectId.isValid('timtomtamted');//true
ObjectId.isValid('551137c2f9e1fac808a5f572');//true


// 你可以使用正则表达式来测试：
const id=new ObjectId('551137c2f9e1fac808a5f572')
if id.match/^[0-9a-fA-F]{24}$/
//it's an ObjectID
else
//nope

// 警告: isValid将返回真正任意 12/24 长度字符串从一个有效的十六进制数字。 目前我认为这是一个更好的检查：
const thing = '551137c2f9e1fac808a5f572'
if((thing.length === 24 || thing.length === 12) && isNaN(parseInt(thing,16))!== true){
  // 是objectId
}
