// Select只有一个参数，它是一个可选的列和/或函数数组，可应用于查询
nSQL('users')
  .query('select', ['username AS name', 'age'])
  .exec()

// 查询可用于获取表中的缓存行数
nSQL('myTable')
  .query('total')
  .exec()

// 这些缓存更新的异步性质意味着使用不带{rebuild: true}参数的此查询可能会给出不是100％准确的结果
// .query("select", ["COUNT(*)"])即使使用，此查询也要快几个数量级{rebuild: true}。

// 插入数据(记录)
// Upserts只接受一个参数，它是一个包含要插入数据库的数据或要插入的对象数组的对象。
// 如果提供了数据的主键，则数据库的那个位置的数据将被新数据替换。
nSQL('users').query('upsert', [
  { name: 'billy', age: 50 },
  { name: 'jeb', age: 30 }
])

// 使用where永远不会插入新行，只修改现有行。如果使用where，则无法使用数组一次插入多个记录

// Upserting一个大数记录
// 在某些情况下，您可能希望修改或添加数千条记录。在这种情况下，
// 使用.stream()api 是个好主意。
nSQL('accounts')
  .query('upsert', { status: 'closed' })
  .where(['balance', '<', 0])
  .stream(
    row => {
      // on row update
    },
    () => {
      // all updates/inserts done
    },
    err => {
      // query encountered error
    }
  )

// 删除
// 使用where语句来查找要修改的行。如果未where提供任何语句，则删除整个表。

// Remove all users who are older than 50
nSQL('users')
  .query('delete')
  .where(['age', '>', 50])
  .exec()

// 删除整个表记录!!!
nSQL('users')
  .query('delete')
  .exec()

// 删除大量记录
// 在某些情况下，您可能希望删除数千条记录。在这种情况下，使用.stream()api 是个好主意
nSQL('users')
  .query('delete')
  .where(['age', '>', 50])
  .stream(
    row => {
      // row deleted
    },
    () => {
      // query finished
    },
    err => {
      // query error
    }
  )

// 克隆
// 克隆用于将整个表及其索引从当前数据库适配器复制到新表中。用于从一个适配器转移到另一个适配器或备份。使用几个属性获取一个参数：
// clone all current tables and indexes into SyncStorage adapter.
nSQL('*')
  .query('clone', {
    mode: new SyncStorage() // or any nanoSQL adapter
  })
  .exec()
  .then(() => {
    // clone done
  })

nSQL('*')
  .query('clone', {
    mode: new SyncStorage()
  })
  .stream(
    row => {
      // row deleted
    },
    () => {
      // query finished
    },
    err => {
      // query error
    }
  )

// 重建索引
// 用于重建二级索引，此查询类型不带参数。您可以使用where语句选择要重建的行。如果未where提供语句，则重建所选表上的所有行。

// Rebuild indexes for users who age is greather than 50
nSQL('users')
  .query('rebuild indexes')
  .where(['age', '>', 50])
  .exec()

// 删除表
// Drop不接受任何参数，它完全删除表中的所有行，并从数据库中删除表及其索引。执行删除后，除非使用create table查询进行删除，否则将无法再次使用该表。
nSQL('users')
  .query('drop')
  .exec()

// 创建表
nSQL()
  .query('create table', {
    name: 'users',
    model: {
      'id:int': { pk: true, ai: true }, // pk = primary key, ai = auto increment
      'age:int': { default: 13, max: 110, min: 13 },
      'name:string': { default: 'none', notNull: true }
    }
  })
  .exec()

// ALTER TABLE 修改表索引，视图，操作和数据模型，而不会破坏现有表数据。
// alter table查询使用与create table查询相同的参数。请记住，表视图，操作，索引和数据模型都将被传递给查询的内容替换，但表中的行不会受到影响
// 您可以安全地更改配置中的任何内容（索引，表名，列等），
//  唯一的例外是主键

// 列出所有 表 tables
// 不接受任何参数，它用于列出当前数据库中的所有表。
// Get a list of all active tables.
nSQL()
  .query('show tables')
  .exec()
  .then(rows => {
    console.log(rows)
    /*
    [
        {table: "users"},
        {table: "posts"},
        ...
    ]
    */
  })

// 显示所选数据库的数据模型或索引
nSQL('users')
  .query('describe')
  .exec()
  .then(rows => {
    rows = [
      { key: 'id', type: 'int', pk: true, ai: true },
      { key: 'name', type: 'string', default: 'none' },
      { key: 'age', type: 'int' },
      { key: 'postIds', type: 'int[]' },
      {
        key: 'meta',
        type: 'obj',
        model: [
          { key: 'key', type: 'string' },
          { key: 'value', type: 'string' }
        ]
      }
    ]
  })

nSQL('users')
  .query('describe indexes')
  .exec()
  .then(rows => {
    rows = [
      { id: 'age', type: 'int', isArray: false, path: ['age'], props: {} }
    ]
  })

// 导入JSON
// 只需为nanoSQL提供要导入的行数组。
nSQL('tableToImport')
  .loadJS([{ id: 1, name: 'Jeb' }, { id: 2, name: 'Bob' }])
  .then()

// 导出CSV
// 只需.toCSV()替代 .exec()，所有常规查询选项可用
// 该.toCSV()函数接受单个可选参数，如果是，则生成的CSV将具有行标题。如果为false，则将省略行标题
nSQL('table')
  .query('select')
  .toCSV(true)
  .then(csv => {})

// 导入CSV
// 导入的CSV必须包含行标题，因此nanoSQL知道将数据放在何处。CSV应符合RFC4180。
// 第一个可选参数是一个rowMap函数，可用于在行转换为JSON之后但在将行插入数据库之前对其进行变更。第二个参数，一个onProgress回调。将为每个行插入调用此函数，并提供0到1之间的数字，表示加载进度
nSQL('tableToImport')
  .loadCSV(
    `
    id,name
    1,Bill
    2,Jeb
    `,
    row => {
      return row
    },
    progress => {
      console.log(progress) // when progress === 1 the import is done
    }
  )
  .then()
