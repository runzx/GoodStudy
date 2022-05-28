# log_format

```conf

  log_format  zx escape=json '[$time_iso8601] $request_time $status $body_bytes_sent $remote_addr '
#		'Authorization:"$http_Authorization" '
 		'"$request" '
#		'$request_method "$request_uri" '
		'brv2token:$http_brv2token ';
#		'$request_body ';

```

1. 非法 json 值和未转义字符串的问题
   1. `escape=json` 会把 字符串里"" 的"变成 \x22， 中文不转换，
      1. {"name":"中"} -> {\"name\":\"中\"}
   2. `escape=defaul` 空串"" -> "-"， 
      1. "\x04\x01\x00Pg)\xA7\xEA\x00"
      2. 中文 转 {"name":"中"} -> {\x22name\x22:\x22\xE4\xB8\x22}
   3. `escape=none` 不转换，如果有 特殊码 winscp 内置编辑器不能打开，显示 
      1. " Pg)ш " 在notepad++里
