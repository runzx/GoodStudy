
import mongoose from 'mongoose';
const { Schema, model } = mongoose

export async function getSession(opt = {
  readConcern: { level: 'snapshot' },
  writeConcern: { w: 'majority' },
}) {
  // const { mongoose } = this.app;
  const session = await mongoose.startSession(opt);
  await session.startTransaction();
  return session;
}

export async function main() {
  const session = await getSession();
  const db = mongoose.connection;
  try {
    let data = { name: 'ceshi' };
    const Cat = new model('Cat', new Schema({ name: String, pass: String }));
    for (let key in data) {
      Cat[key] = data[key]
    }
    await db
      .collection('cats')
      .insertOne(Cat, { session });
    // 提交事务
    await session.commitTransaction();
    return 'ok';
  } catch (err) {
    // 回滚事务
    const res = await session.abortTransaction();
    console.log(res)
    this.ctx.logger.error(new Error(err));
  } finally {
    await session.endSession();
  }

}