// {$inc: { 'skus.$.stock': -item.count }   查询到的数组元素 进行 计算
// { 'skus.$.stock': 888 }          查询到的数组元素 更新 值
const update = {
  $inc: {
    'skus.$.stock': 2
  }
}
// 查询数组内对象 属性 要用'.'，并且所有都为字符串，$可为第一个符合条件元素
const r = await Product.findOneAndUpdate({
  'skus.sku_id': 41
}, update)

//  删除Array Schema中的一个值或者对象
const article={
  "_id" : ObjectId("54fcb3890cba9c4234f5c925"),
  "title" : "A test Article",
  "comments": [
    {
    "post": "this is Update comment",
    "_id": ObjectId("54fe0976250888001d5e6bc4"),
    "posted": ISODate("2015-03-09T20:58:30.302Z")
    }
  ] 
}

const comment_id = '54fcb3890cba9c4234f5c925'
Article.findByIdAndUpdate(
  article_id,
 { $pull: { 'comments': {  _id: comment_id } } })

//  在Mongoose中向Array Schema增加一个值或者对象
  const body = {post: "this is the test comments"}
  Article.findByIdAndUpdate(
    article_id,
    { $push: {"comments": body}},
    {  safe: true, upsert: true})