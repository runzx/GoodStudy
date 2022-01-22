# add 如没有 index 就自动生成

1. PUT index/type/id
2. POST index/type
   1. "\_id":"AV3qGfrC6jMbsbXb6k1p",自生成
3. update
   1. version 从 1 变成 2
   2. result 从 created 变成 updated
   3. created : false
