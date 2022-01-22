# windows setup

1. https://www.elastic.co/cn/downloads/elasticsearch download
2. 内存不足，配置：elasticsearch-7.3.0/config/jvm.options
   1. -Xms1G
   2. -Xmx1G
3. `./config/elasticsearch.yml`配置 path.data
4. `./config/elasticsearch.yml`配置 path.logs
5. 要远程访问: `network.host: 0.0.0.0`
6. start elastic `bin\elasticsearch.bat`
   1. 守护进程在后台运行，那么可以在后面添加参数 -d
7. `curl http://localhost:9200`

## 分词 ik

1. `https://github.com/medcl/elasticsearch-analysis-ik`

## 安装 kibana,Sense

0. `.\bin\kibana.bat` `http://localhost:5601`
   1. `i18n.locale: "zh-CN"` 中文 config/kibana.yml
   2. `http://localhost:5601/status`
1. Sense 是一个 Kibana 应用 它提供交互式的控制台
2. `bin\kibana.bat plugin --install elastic/sense`

```
{
  "name" : "B450",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "rGnaz24OTi2SSuw13-uGhQ",
  "version" : {
    "number" : "7.16.3",
    "build_flavor" : "default",
    "build_type" : "zip",
    "build_hash" : "4e6e4eab2297e949ec994e688dad46290d018022",
    "build_date" : "2022-01-06T23:43:02.825887787Z",
    "build_snapshot" : false,
    "lucene_version" : "8.10.1",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}

 using geoip-databases directory [C:\Users\runzx\AppData\Local\Temp\elasticsearch\geoip-databases\qChr-RHRQWK9C22Ohjj-Vw]
```
