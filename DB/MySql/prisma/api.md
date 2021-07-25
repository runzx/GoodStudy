#

## select 和 include 返回 属性

    select 和include不能同时存在
    两者都是规定返回值。

```js
// AND OR NOT 结合多个过滤条件
// 过滤条件  euqals not in notin It(<) Ite(<=) gt(>) gte(>=) contains startsWith endsWith
const result = await prisma.post.findMany({
  where: {
    OR: [
      {
        title: {
          contains: 'Prisma',
        },
      }
    ],
    NOT: {
      title: {
        contains: 'SQL',
      },
    },
  },
})

// Prisma Client提供以下运算符，用于筛选一对多关系： some every none
const result = await prisma.user.findMany({
  where: {
    post: {
        every: {
          published: true
        }
      some: {
        content: {
          contains: "Prisma"
        }
      }
    }
  }
})

// 用include filter
const result = await prisma.user.findMany({
  where: {
    email: {
      contains: 'prisma.io',
    },
  },
  include: {
    Post: {
      where: {
        published: false,
      },
    },
  },
})

result =await prisma.user.findMany({
  where: {
    email: {
      contains: 'prisma.io',
    },
  },
  select: {
    Post: {
      where: {
        published: false,
      },
      select: {
        title: true,
      },
    },
  },
})


result =await prisma.user.create({
  data: {
      name: "Nancy1",
      email: "nancy1@prisma.io",
      Post: {
          create: {title: "Join us for Prisma Day 2020"}
          // connect: {id: 1},
      }
  }
})

```

## sql 原生数据查询

`const result = await prisma.raw('SELECT * FROM User;')`

## 日志级别

`const prisma = new PrismaClient({ log: ['query', 'info', 'warn'], });`
