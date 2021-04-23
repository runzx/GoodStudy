# Add to existing project

1. `yarn add prisma`
2. `yarn prisma init`
3. Set the DATABASE_URL in the .env file
`DATABASE_URL="mysql://zhaixiang-db:zx2962@127.0.0.1:3306/cms"`  
    用localhost 可能会找不到    
4. Set the provider of the datasource block in schema.prisma 
5. Run `yarn prisma db pull` to turn your database schema into a Prisma data model.

6. Run `yarn prisma generate` to install Prisma Client. You can then start querying your database.

```js
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
```
7. 由于关系字段是虚拟的（即它们不直接显示在数据库中），因此您可以在Prisma模式中手动重命名它们，而无需touching数据库

8. 该`@prisma/client`模块引用命名的文件夹`.prisma/client`，`yarn prisma generate`后会生成新的Prisma client。