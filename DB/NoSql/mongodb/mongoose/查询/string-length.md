# 查询 字符串 长度
1. `find({ nickName: { "$regex": /^.{0,1}$/ } })` 0 <= length <= 1
2. `find({ nickName: { "$regex": /^.{1,}$/ } })` 1 <= length
2. `find({ nickName: { "$regex": /^.{1}$/ } })` 1 = length
3. `find({"comment":{"$exists":true},"$where":"this.comment.length>10"})` // 如果不先判断存在，则有记录没有commnet字段时 报错
4. $where 可执行 js 代码 
