// s是一个readable数据流，它可以监听以下事件。

s.on('data', f) // 收到新的数据时，data事件就会发生，触发f()
s.on('end', f) // 数据读取完以后，不会再收到数据了，end事件发生，触发f()
s.on('error', f) // 发生错误时，error事件发生，触发f()
s.readable // => true if it is a readable stream that is still open
s.pause() // Pause "data" events.  For throttling uploads, e.g.
s.resume() // Resume again
