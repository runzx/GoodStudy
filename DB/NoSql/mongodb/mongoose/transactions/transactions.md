# transactions 
1. mongodb 4.0 mongoose 5.2

```js
import mongoose from 'mongoose';

// Using Mongoose's default connection
const session = await mongoose.startSession();

// Using custom connection
const db = await mongoose.createConnection(mongodbUri).asPromise();
const session = await db.startSession();

// session.withTransaction()助手处理:
  // 创建交易
  // 如果成功则提交事务
  // 如果您的操作抛出，则中止事务
  // 在发生临时事务错误时重试。
let session = null;
return Customer.createCollection().
  then(() => Customer.startSession()).
  // The `withTransaction()` function's first parameter is a function
  // that returns a promise.
  then(_session => {
    session = _session;
    return session.withTransaction(() => {
      return Customer.create([{ name: 'Test' }], { session: session });
    });
  }).
  then(() => Customer.countDocuments()).
  then(count => assert.strictEqual(count, 1)).
  then(() => session.endSession());
```

```js
// 如果您从 session会话 或使用 session会话 用findOne() find()获取 Mongoose 文档，该文档将保留对 session会话 的引用并将该会话用于save()
// 要 get/set 给定文档关联的会话，请使用 doc.$session()
const User = db.model('User', new Schema({ name: String }));

let session = null;
return User.createCollection().
  then(() => db.startSession()).
  then(_session => {
    session = _session;
    return User.create({ name: 'foo' });
  }).
  then(() => {
    session.startTransaction();
    return User.findOne({ name: 'foo' }).session(session);
  }).
  then(user => {
    // Getter/setter for the session associated with this document.
    assert.ok(user.$session());
    user.name = 'bar';
    // By default, `save()` uses the associated session
    return user.save();
  }).
  then(() => User.findOne({ name: 'bar' })).
  // Won't find the doc because `save()` is part of an uncommitted transaction
  then(doc => assert.ok(!doc)).
  then(() => session.commitTransaction()).
  then(() => session.endSession()).
  then(() => User.findOne({ name: 'bar' })).
  then(doc => assert.ok(doc));

// 中止事务
let session = null;
return Customer.createCollection().
  then(() => Customer.startSession()).
  then(_session => {
    session = _session;
    session.startTransaction();
    return Customer.create([{ name: 'Test' }], { session: session });
  }).
  then(() => Customer.create([{ name: 'Test2' }], { session: session })).
  then(() => session.abortTransaction()).
  then(() => Customer.countDocuments()).
  then(count => assert.strictEqual(count, 0)).
  then(() => session.endSession());
```
### 使用聚合框架
```js
const Event = db.model('Event', new Schema({ createdAt: Date }), 'Event');

let session = null;
return Event.createCollection().
  then(() => db.startSession()).
  then(_session => {
    session = _session;
    session.startTransaction();
    return Event.insertMany([
      { createdAt: new Date('2018-06-01') },
      { createdAt: new Date('2018-06-02') },
      { createdAt: new Date('2017-06-01') },
      { createdAt: new Date('2017-05-31') }
    ], { session: session });
  }).
  then(() => Event.aggregate([
    {
      $group: {
        _id: {
          month: { $month: '$createdAt' },
          year: { $year: '$createdAt' }
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1, '_id.year': -1, '_id.month': -1 } }
  ]).session(session)).
  then(res => assert.deepEqual(res, [
    { _id: { month: 6, year: 2018 }, count: 2 },
    { _id: { month: 6, year: 2017 }, count: 1 },
    { _id: { month: 5, year: 2017 }, count: 1 }
  ])).
  then(() => session.commitTransaction()).
  then(() => session.endSession());
```