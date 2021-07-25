# SQL 语法

## sql 语法 要点

1. 语句 不分大小写， 表名、列名、值依赖 DBMS/配置
2. 语句间用';'分隔
3. 空格 忽略， 可写多行。
4. 注释: ## -- /\* \*/ 3 种

## SQL 分类

### DDL 数据定义语言

1. CREAT,ALTER,DROP

### DML 数据操控语言

1. INSERT, UPDATE, DELETE, SELECT :CRUD

### TCL 事务控制语言

1. COMMIT, ROLLBACK

### DCL 数据控制语言

0. 对数据访问权进行控制的指令
1. GRANT, REVOKE
2. CONNECT, SELECT, INSERT, UPDATE,DELETE, USAGE, REFERENCES

## curd

1. 插入数据

```SQL
INSERT INTO user
VALUES (1,'ZX', '123','zx@qq.com');

INSERT INTO user(email)
VALUES ('zx@qq.com');

-- 插入查询出来的数据
INSERT INTO user(username)
SELECT name
FROM account;
```

2. 更新数据

```sql
UPDATE user
SET username='zx',password='123'
WHERE username = 'zhaix';
```

3. 删除数据

```sql
DELETE FROM user
WHERE username = 'zhaix';

-- 清空表中的数据
TRUNCATE TABLE user;
```

4. 查询数据

```sql
SELECT price    -- * 所有
FROM products;

-- 返回前 5 行
SELECT * FROM mytable LIMIT 5;
SELECT * FROM mytable LIMIT 0, 5;
-- 返回第 3 ~ 5 行
SELECT * FROM mytable LIMIT 2, 3;
```

## 子查询

1. 子查询也称为内部查询或内部选择
2. 包含子查询的语句也称为外部查询或外部选择。
3. 可以嵌套在 SELECT，INSERT，UPDATE 或 DELETE 语句内或另一个子查询中
4. 子查询通常会在另一个 SELECT 语句的 WHERE 子句中添加。
5. 可以使用比较运算符，如 >，<，或 =。比较运算符也可以是多行运算符，如 IN，ANY 或 ALL
6. 子查询必须被圆括号 `()` 括起来。
7. 内部查询首先在其父查询之前执行，以便可以将内部查询的结果传递给外部查询。

```sql
SELECT cust_name, cust_contact
FROM customers
WHERE cust_id IN (SELECT cust_id
                  FROM orders
                  WHERE order_num IN (SELECT order_num
                                      FROM orderitems
                                      WHERE prod_id = 'RGAN01'));

```
