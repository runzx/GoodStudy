const mongoose = require('mongoose')
const uri = 'mongodb://127.0.0.1:27017/test'
const demo = async () => {
  await mongoose.connect(uri, { useNewUrlParser: true })
  await mongoose.connection.dropDatabase()
  const User = mongoose.model('User', new mongoose.Schema({
    firstName: String, lastName: String
  }))

  const transfer = async () => {
    const session = mongoose.startSession()
    session.startTransaction()
    try {
      const user = new User({ firstName: 'alfieri' })
      const result = await user.save()
      await User.findOneAndUpdate({ _id: result._id }, { $inc: { lastName: 'chou' } })
      await session.commitTransaction()
      session.endSession()
      return user
    } catch (err) {
      await session.abortTransaction()
      session.endSession()
      throw new Error('something went wrong')
    }
  }
  console.log('-------->', transfer())
}
demo()