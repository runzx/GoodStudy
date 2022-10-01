// https://www.mongodb.com/docs/manual/core/transactions-in-applications/#std-label-txn-mongo-shell-example

// Create collections:
db.getSiblingDB("mydb1").foo.insertOne(
  { abc: 0 },
  { writeConcern: { w: "majority", wtimeout: 2000 } }
)
db.getSiblingDB("mydb2").bar.insertOne(
  { xyz: 0 },
  { writeConcern: { w: "majority", wtimeout: 2000 } }
)
// Start a session.
session = db.getMongo().startSession({ readPreference: { mode: "primary" } });

coll1 = session.getDatabase("mydb1").foo;
coll2 = session.getDatabase("mydb2").bar;
// Start a transaction
session.startTransaction({ readConcern: { level: "local" }, writeConcern: { w: "majority" } });
// Operations inside the transaction
try {
  coll1.insertOne({ abc: 1 });
  coll2.insertOne({ xyz: 999 });
} catch (error) {
  // Abort transaction on error
  // 事务结束, 不保存事务中的操作所做的任何更改。
  session.abortTransaction(); // 终止多文件交易,并回滚事务中的操作所做的任何数据更改
  throw error;
}
// Commit the transaction using write concern set at transaction start
session.commitTransaction();  // 保存操作中所做的更改多文件交易, 结束 事务

session.endSession();