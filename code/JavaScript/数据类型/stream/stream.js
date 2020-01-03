end() // 或是
destory() // 以后socket并不是直接释放或消失了
// 那些没有触发
on('close', () => {})
// 的socket进入了一个叫做ReadOnly的状态。

// 也就是说，当调用end到对端，socket被关闭而无法被写入的时候，
// 那些没有被拿走的数据都被缓存到这个Buffer,
// 在这个Buffer被清空之前是不会走到“end"->"close"->"destory"状态的.所以解决办法是把pengding的buffer拿空，保证socket drain.

// 当到达流数据的尽头时， 'readable' 事件也会触发，但是在 'end' 事件之前触发。
// 'readable' 事件表明流有新的动态：要么有新的数据，要么到达流的尽头。
// 对于前者，stream.read() 会返回可用的数据。
// 对于后者，stream.read() 会返回 null
agentSocket.on('readable', () => {
  while (agentSocket.read() != null);
})


// 可读流运作于两种模式之一：流动模式（flowing）
// 或暂停模式（paused）
// 在流动模式中，数据自动从底层系统读取，并通过 EventEmitter 接口的事件尽可能快地被提供给应用程序。
// 在暂停模式中，必须显式调用 stream.read() 读取数据块。

