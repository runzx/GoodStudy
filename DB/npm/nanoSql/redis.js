import { Redis } from "@nano-sql/adapter-redis";
import { nSQL } from "@nano-sql/core";
 
nSQL().connect({
    id: "my_db",
    mode: new Redis(),
    tables: [...]
}).then(...)

// 适配器在redis内部使用npm 模块并调用redis.createClient以连接到redis数据库
redis.createClient([options])
redis.createClient(unix_socket[, options])
redis.createClient(redis_url[, options])
redis.createClient(port[, host][, options])
/* 
Property	Default	    Description
host	    127.0.0.1	  IP address of the Redis server
port	    6379	      Port of the Redis server
path	    null	      The UNIX socket string of the Redis server
url	      null	      The URL of the Redis server. Format: [redis:]//[[user][:password@]][host][:port][/db-number][?db=db-number[&password=bar[&option=value]]] (More info avaliable at IANA).
parser	  javascript	Deprecated Use either the built-in JS parser javascript or the native hiredis parser. Note node_redis < 2.6 uses hiredis as default if installed. This changed in v.2.6.0.
string_numbers	null	Set to true, node_redis will return Redis number values as Strings instead of javascript Numbers. Useful if you need to handle big numbers (above Number.MAX_SAFE_INTEGER === 2^53). Hiredis is incapable of this behavior, so setting this option to true will result in the built-in javascript parser being used no matter the value of the parser option.
return_buffers	false	If set to true, then all replies will be sent to callbacks as Buffers instead of Strings.
detect_buffers	false	If set to true, then replies will be sent to callbacks as Buffers. This option lets you switch between Buffers and Strings on a per-command basis, whereas return_buffers applies to every command on a client. Note: This doesn't work properly with the pubsub mode. A subscriber has to either always return Strings or Buffers.
socket_keepalive	true	If set to true, the keep-alive functionality is enabled on the underlying socket.
no_ready_check	false	When a connection is established to the Redi */