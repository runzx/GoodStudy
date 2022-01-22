# 基本概念: 分布式数据库

1. 单个 Elastic 实例称为一个节点（node）。一组节点构成一个集群（cluster）。
2. 索引所有字段，经过处理后写入一个反向索引（Inverted Index）
3. 顶层单位就叫做 Index（索引）。它是单个数据库的同义词
4. 查看当前节点的所有 Index: `curl -X GET 'http://localhost:9200/_cat/indices?v'`
5. Index 里面单条的记录称为 Document（文档）
6. Document 使用 JSON 格式表示
7. 不要求有相同的结构（scheme），但是最好保持相同，这样有利于提高搜索效率。
8. 分组就叫做 Type，它是虚拟的逻辑分组，用来过滤 Document。
   1. `curl 'localhost:9200/_mapping?pretty=true'` 列出每个 Index 所包含的 Type

## 新建和删除 Index

1. `curl -X PUT 'localhost:9200/weather'` acknowledged=true, 成功
2. `curl -X DELETE 'localhost:9200/weather'`

## 中文分词设置

0. 中文分词插件。这里使用的是 ik
1. setup:`./bin/elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v5.5.1/elasticsearch-analysis-ik-5.5.1.zip`
2. `https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.16.3/elasticsearch-analysis-ik-7.16.3.zip`
3. unzip plugin to folder your-es-root/plugins/ik 手工安装
