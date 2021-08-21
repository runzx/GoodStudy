1. `application/x-www-form-urlencoded`

- 提交的数据按照 `key1=val1&key2=val2` 的方式进行编码，
- 编码的格式是 ASCII
- key 和 val 都进行了 URL 转码
- 请求头信息每行一条
- 空行之后便是 Body，即 '内容'(entity)

```
POST http://www.example.com HTTP/1.1
Content-Type: application/x-www-form-urlencoded;charset=utf-8

title=test&sub%5B%5D=1&sub%5B%5D=2&sub%5B%5D=3
```

2. `application/json` 告诉服务端消息主体是序列化后的 JSON 字符串

```
POST http://www.example.com HTTP/1.1
Content-Type: application/json;charset=utf-8

{"title":"test","sub":[1,2,3]}
```

3. `text/xml`

```
POST http://www.example.com HTTP/1.1
Content-Type: text/xml

  <?xml version="1.0"?>
  <methodCall>
      <methodName>examples.getStateName</methodName>
      <params>
          <param>
              <value><i4>41</i4></value>
          </param>
      </params>
  </methodCall>
```

4. `multipart/form-data`
   - 支持向服务器发送二进制数据
   - 使用表单上传文件时，必须让 `<form>` 表单的 `enctype="multipart/form-data"`
   - boundary 这个参数是分界线的意思 : `--boundary`
   - name="你的参数名" ： 参数名这行后面一定要有 2 个换行, 然后才是参数的值
   - 整个请求体拼装完成后 , 最后会以 `--boundary--` 结尾

```html
<form method="POST" action="http://w.sohu.com/t2/upload.do" enctype="multipart/form-data">
  <input type="text" name="city" value="Santa colo" />
  <input type="text" name="desc" />
  <input type="file" name="pic" />
</form>
```

```
POST http://www.example.com HTTP/1.1
Content-Type:multipart/form-data; boundary=----WebKitFormBoundaryrGKCBY7qhFd3TrwA

------WebKitFormBoundaryrGKCBY7qhFd3TrwA
Content-Disposition: form-data; name="text"

title
------WebKitFormBoundaryrGKCBY7qhFd3TrwA
Content-Disposition: form-data; name="file"; filename="chrome.png"
Content-Type: image/png                       // 指定类型

PNG ... content of chrome.png ...             // buffer 内容
------WebKitFormBoundaryrGKCBY7qhFd3TrwA--    // --分隔符-- 结束
```
