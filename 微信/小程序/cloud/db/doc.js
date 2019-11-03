const db = wx.cloud.database()
const Model = db.collection('name')

const _id = 'todo-identifiant-aleatoire' // 可选自定义 _id
const res = await db.doc(_id).get() // 通过_id取一条记录
