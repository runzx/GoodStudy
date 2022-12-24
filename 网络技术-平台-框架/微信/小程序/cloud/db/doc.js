const db = wx.cloud.database()
const Model = db.collection('name')

const _id = 'todo-identifiant-aleatoire' // 可选自定义 _id
const res = await db.doc(_id).get() // 通过_id取一条记录

// zx封装 Base.js, baseServer.js // 后是服务端用
// 和monogoose相近的api:
find({},start,count,field,sort)  // {data:[]},data.length<20/100 小程序端/服务器端
findById()
findOneAndUpdate()
create()
// 小程序端
findOneAndRemove()

// 服务端
updateMany()
deleteMany()