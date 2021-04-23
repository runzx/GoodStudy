#

```
enum Role {
  USER
  ADMIN
}
model User {
  id    Int   @id @default(autoincrement())
  role  Role  @default(USER)
}

```

## Scalar types 表量类型:

    String
    Boolean
    Int
    Float
    DateTime(2020-03-19T14:21:00+0200)
    Json

## relations 关系

```js
model User {
  id      Int      @id @default(autoincrement())
  profile Profile?
  // 一对多
  posts     Post[]
}

model Profile {
  id      Int     @id @default(autoincrement())
  // 一对一
  user    User    @relation(fields: [userId], references: [id])
  userId  Int     // relation scalar field (used in the `@relation` attribute above)
}

model Post {
  id         Int     @id @default(autoincrement())
  title      String
  // 一对一
  author     User    @relation(fields: [authorId], references: [id])
  authorId   Int     // relation scalar field (used in the `@relation` attribute above)
  categories CategoriesOnPosts[]
}

model Category {
  id    Int                 @id @default(autoincrement())
  name  String
  posts CategoriesOnPosts[]
}
// 多对多 显式
model CategoriesOnPosts {
  post        Post     @relation(fields: [postId], references: [id])
  postId      Int       // relation scalar field (used in the `@relation` attribute above)
  category    Category @relation(fields: [categoryId], references: [id])
  categoryId  Int      // relation scalar field (used in the `@relation` attribute above)
  @@id([postId, categoryId])  // 定义多个单字段ID
}

```
