/*
 * @Author: xiang.zhai 
 * @Date: 2019-01-11 08:03:01 
 * @Last Modified by: xiang.zhai
 * @Last Modified time: 2019-01-11 08:16:21
 * Offset/limit-based Pagination 
 * https://facebook.github.io/relay/graphql/connections.htm
 */
// 假設今天我們有個 Schema 如下:
type Post {
  id: ID!
  title: String
  body: String
  "Unix timestamp milliseconds (毫秒) 格式"
  createdAt: String
}

Query {
  posts(offset: Int = 0, limit: Int = 100)
}

const resolvers = {
  Query: {
    posts(root, { offset, limit }, { db }) {
      return db.query('SELECT * FROM post LIMIT $1 OFFSET $2', [limit, offset]);
    }
  }
};
/* 
缺點：
  當 offset 越來越大時，每筆 db operation 會需要花更多的時間。
  offset/limit-based pagination 無法處理在換頁時被刪除或是新增的資料。
   *//* 
使用 Cursored-based Pagination 時有一個非常重要的要求，
  那就是資料必須有明確且固定的排序機制，不然 cursor 就失去了紀錄位址的功能。
 */
Query {
  # 這裡的 cursor 僅能輸入相對應得 date 格式 (Unix timestamp milliseconds) 才能做正確比較
  post(cursor: String, limit: Int = 50): [Posts!]!
}

const { UserInputError } = require('apollo-server');

const resolvers = {
  Query {
    posts: (root, { cursor, limit }, { db }) => {
      // 1. 如果有 cursor 就檢查 cursor 格式
      if (cursor && isNaN(new Date(Number(cursor)).getTime())) {
        throw new UserInputError('Incorrect Cursor Format')
      }
      // 2. 如果沒 curosr 就直接傳進 limit (第一頁); 有則加入 Where 判斷
      return cursor
        ? db.query('SELECT * FROM post WHERE created_at < $1 ORDER BY created_at DESC LIMIT $2', [cursor, limit])
        : db.query('SELECT * FROM post LIMIT $1 ORDER BY created_at DESC', [limit]);
    }
  }
}
/* 
Connection 模式
分頁資訊 PageInfo 如
  是否有下一頁 hasNextPage: Boolean!
  是否有上一頁 hasPreviousPage: Boolean!
  總頁數 totalPageCount: Int (通常非必要)
Edge
  指標 cursor 與上面提到的方式雷同。
    不過因為 **cursor 本身設計並非 Huamn-Readable **，因此通常會做 base64 轉換，這樣對資料隱匿性也比較好，也比較不容易讓前端誤會資料的用途。
  節點 node 為真正的實際資料 (終於！)
*/

PostConnection {
  edges [{
    cursor,
    node
  }, ...],
  pageInfo {
    hasNextPage,
    hasPreviousPage,
    totalPageCount
  }
}
// Schema
type PostConnection {
  "資料"
  edges: [PostEdge!]!
  "分頁資訊"
  pageInfo: PageInfo!
}

type PostEdge {
  "指標。通常為一串 base64 字元"
  cursor: String!
  "實際 Post 資料"
  node: Post!
}

type PageInfo {
  "是否有下一頁"
  hasNextPage: Boolean!
  "是否有上一頁"
  hasPreviousPage: Boolean!
  "總頁數"
  totalPageCount: Int
}

type Query {
  posts(
    "回傳開頭的前 N 筆資料"
    first: Int
    "會回傳該 curosr 後面的資料。一定要搭配 `first`"
    after: String
    "回傳倒數的 N 筆資料。一定要搭配 `before`"
    last: Int
    "會回傳該 curosr 前面的資料。一定要搭配 `last`"
    before: String
  ): PostConnection!
}

type PostConnection {
  "資料"
  edges: [PostEdge!]!
  "分頁資訊"
  pageInfo: PageInfo!
}

type PostEdge {
  "通常為一串 base64 字元"
  cursor: String!
  "實際 Post 資料"
  node: Post!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  totalPageCount: Int
}

const { UserInputError } = require('apollo-server');

const resolvers = {
  Query: {
    posts: async (root, { first, after, last, before, reverse }, { db }) => {
      if (!first && after) throw new UserInputError('after must be with first')
      if ((last && !before) || (!last && before)) throw new UserInputError('last and before must be used together')
      if (first && after && last && before) throw new UserInputError('Incorrect Arguments Usage.')

      let posts;
      // 取得下一頁資料
      if (first) {
        posts = after
          ? await db.query(
              'SELECT *, count(*) OVER() AS count FROM post WHERE created_at < $1 ORDER BY created_at DESC LIMIT $2',
              [new Buffer(after, 'base64').toString(), first]
            )
          : await db.query('SELECT * FROM post ORDER BY created_at DESC LIMIT $1', [first]);
      }

      // 或是取得上一頁資料
      if (last) {
        posts = await db.query(
          `SELECT * FROM (
              SELECT *, count(*) OVER() AS count FROM post WHERE created_at > $1 ORDER BY created_at ASC LIMIT $2
           ) posts ORDER BY created_at DESC`,
          [new Buffer(before, 'base64').toString(), last]
        )
      }

      // 取得有條件 (WHERE) 但未限制數量 (LIMIT) 的真正數量
      const countWithoutLimit = posts[0].count;
      // 取得總數量
      const allCount = db.query('SELECT count(*) as number FROM post;').count;

      return {
        edges: posts.map(post => ({
          // 指標 (將 createdAt 做 base64)
          cursor: Buffer.from(post.createdAt).toString('base64')
          // 實際資料
          node: post,
        }))
        pageInfo: {
          // 檢查有無下一頁
          hasNextPage: first ? countWithoutLimit > first : allCount > countWithoutLimit,
          // 檢查有無上一頁
          hasPreviousPage: last ? countWithoutLimit > last : alCount > countWithoutLimit,
          // 總頁數
          totalPageCount: Math.ceil(allCount / (fist || last))
        }
      }
  },
}

