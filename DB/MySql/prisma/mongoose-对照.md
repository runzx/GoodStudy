# mongoose api 对照

```js
// Fetching relations
const posts = await prisma.user.findUnique({
  where: {
    id: 2
  },
  include: {
    post: true
  }
})

const userWithPosts = await User.findById(id).populate('posts')

// Relation filters
const posts = await prisma.user.findMany({
  where: {
    Post: {
      some: {
        title: {
          contains: 'Hello'
        }
      }
    }
  }
})

// Pagination
// 1. Cursor-style pagination:
const page = prisma.post.findMany({
  before: {
    id: 242
  },
  last: 20
})
// 2. Offset pagination:
const cc = prisma.post.findMany({
  skip: 200,
  first: 20
})

const posts = await Post.find({
  skip: 5,
  limit: 10
})

// Creating objects
const user = await prisma.user.create({
  data: {
    email: 'alice@prisma.io'
  }
}) // {},

const user = await User.create({
  name: 'Alice',
  email: 'alice@prisma.io'
})

// Updating objects
const user = await prisma.user.update({
  data: {
    name: 'Alicia'
  },
  where: {
    id: 2
  }
})

const updatedUser = await User.findOneAndUpdate(
  { _id: id },
  {
    $set: {
      name: 'James',
      email: 'james@prisma.io'
    }
  }
)

// Deleting objects
const user = prisma.user.delete({
  where: {
    id: 10
  }
})
const users = await prisma.user.deleteMany({
  where: {
    id: {
      in: [1, 2, 6, 6, 22, 21, 25]
    }
  }
})

await User.deleteOne({ _id: id })
await User.deleteMany({ userUID: uid, id: { $in: [10, 2, 3, 5] } })

prisma.user.findUnique() // {}, null 没找到
prisma.user.findFirst({
  orderBy,
  skip,
  distinct, // 按特定字段过滤出重复的行
  take // 1/-1 指定应在列表中返回多少个对象,负值都会反转该列表
}) // {}, null 没找到

user.findOne()

prisma.user.findMany(/*同findFirst()*/) // [{}], [] 没找到

prisma.user.update({
  data,
  where,
  select,
  include
}) // {}
prisma.user.upsert({
  update,
  create,
  where,
  select,
  include
}) // {}

// 尚不支持数据库级别的批量插入
// 在一个事务中创建多个记录
prisma.user.createMany({
  data,
  skipDuplicates // 不要插入具有唯一字段或ID字段已存在的记录。
}) // { count: 3 } 创建数量
//  SQLite不支持
// 不能创建或连接的关系-你不能嵌套create，createMany，connect，connectOrCreate顶层内createMany
prisma.user.updateMany({ data, where }) // {count}
prisma.user.deleteMany({ where }) // {count}

prisma.user.count({ where, cursor, skip, take, orderBy, distinct, select }) // num

aggregate()
groupBy()

```
