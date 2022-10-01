
const { MongoClient } = require('mongodb')
const uri = 'mongodb://127.0.0.1:27017/test'
const demo = async () => {
  const client = await MongoClient.connect(uri, { useNewUrlParser: true })

  const db = client.db('test')
  await db.dropDatabase()

  const transfer = async () => {
    const session = client.startSession()
    session.startTransaction()
    try {
      const user = await db.collection('users').insert({ firstName: 'alfieri' })
      await db.collection('users').findOneAndUpdate({ _id: user._id }, { $inc: { lastName: 'chou' } })
      await session.commitTransaction()
      session.endSession()
      return user
    } catch (err) {
      await session.abortTransaction()
      session.endSession()
      throw new Error('something went wrong')
    }
  }

  console.log('------->', transfer())
}
demo()