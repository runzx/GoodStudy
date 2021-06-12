# aria2 JSON_RPC

1. on http / websocket (`ws://HOST:PORT/jsonrpc`)
2. http 上没有通知(notifications), ws 支持，不支持浮点数
3. string utf-8

4. gid 每个下载 id, 64bit,唯一。hex char.

5. `aria2.addUri([secret], uris[, options[, position]])`

```js
req = {
  jsonrpc: '2.0',
  id: 'qwer',
  method: 'aria2.addUri',
  params: [['http://example.org/file']]
}

result = {
  id: 'qwer',
  jsonrpc: '2.0',
  result: '2089b05ecca3d829' // 下载任务gid
}
```

6. `aria2.addTorrent([secret], torrent[, uris[, options[, position]]])`

```js
torrent = fs.readFileSync('file.torrent', 'base64') // base64 格式
req = {
  jsonrpc: '2.0',
  id: 'no2',
  method: 'aria2.addTorrent',
  params: [torrent]
}

result = {
  id: 'no2',
  jsonrpc: '2.0',
  result: '2089b05ecca3d829' // 下载任务 gid
}
```
