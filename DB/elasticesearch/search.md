# 数据查询

1. all `/Index/Type/_search`
   1. took 字段表示该操作的耗时（单位为毫秒
   2. timed_out 字段表示是否超时
   3. hits 字段表示命中的记录
      1. max_score：最高的匹配程度
      2. `_score` 字段，表示匹配的程序，默认是按照这个字段降序排列。
2. `GET /index/type/id`
   1. `_source` 字段返回原始记录
   2. found 字段表示查询成功
3. query
   1. `/index/type/_search?q=last_name:Smith`
   2. json

```json
{
  "query" : {
    "match" : {
      "last_name" : "Smith"
    }
  }
}
// 过滤器 filter
{
  "query" : {
    "bool": {
      "must": {
        "match" : {
          "last_name" : "smith"
        }
      },
      "filter": {
        "range" : {
          "age" : { "gt" : 30 }
        }
      }
    }
  }
}

// 短语 match_phrase
{
    "query" : {
        "match_phrase" : {
            "about" : "rock climbing"
        }
    },
    "highlight": {  // 高亮 部分文本片段
        "fields" : {
            "about" : {}
        }
    }
}



```
