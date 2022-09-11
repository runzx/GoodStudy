# transactions 
1. mongodb 4.2 前不能在事务中创建 集合
2. mongodb 4.4 可以在事务中创建  集合
3. 单个文档 操作 是原子的 

```js
import mongoose from 'mongoose';


  // For a replica set, include the replica set name and a seedlist of the members in the URI string; e.g.
  // const uri = 'mongodb://mongodb0.example.com:27017,mongodb1.example.com:27017/?replicaSet=myRepl'
  // For a sharded cluster, connect to the mongos instances; e.g.
  // const uri = 'mongodb://mongos0.example.com:27017,mongos1.example.com:27017/'

  const client = new MongoClient(uri);
  await client.connect();

  // Prereq: Create collections.

  await client
    .db('mydb1')
    .collection('foo')
    .insertOne({ abc: 0 }, { writeConcern: { w: 'majority' } });

  await client
    .db('mydb2')
    .collection('bar')
    .insertOne({ xyz: 0 }, { writeConcern: { w: 'majority' } });

  // Step 1: Start a Client Session
  const session = client.startSession();

  // Step 2: Optional. Define options to use for the transaction
  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' }
  };

  // Step 3: Use withTransaction to start a transaction, execute the callback, and commit (or abort on error)
  // Note: The callback for withTransaction MUST be async and/or return a Promise.
  try {
    await session.withTransaction(async () => {
      const coll1 = client.db('mydb1').collection('foo');
      const coll2 = client.db('mydb2').collection('bar');

      // Important:: You must pass the session to the operations

      await coll1.insertOne({ abc: 1 }, { session });
      await coll2.insertOne({ xyz: 999 }, { session });
    }, transactionOptions);
  } finally {
    await session.endSession();
    await client.close();
  }

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

### session MongoDB 3.6 版本中引入的，session 本质上可以理解为一个「上下文」
1. readConcern: local、majority、snapshot 
2. writeConcern: 1, majority 