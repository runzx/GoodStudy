// 1. 发送端封包：
const head = new Buffer(4)
const jsonStr = JSON.stringify(json)
const body = new Buffer(jsonStr)
//超过一字节的大端写入
head.writeInt32BE(body.byteLength, 0) // 4B
const buffer = Buffer.concat([head, body])

// 2. 接收端收到buffer入缓冲区：
let dataReadStart = 0 //新数据的起始位置
let dataLength = buffer.length // 要拷贝数据的长度
let availableLen = _bufferLength - _dataLen // 缓冲区剩余可用空间

// 3. buffer剩余空间不足够存储本次数据
if (availableLen < dataLength) {
  let newLength =
    Math.ceil((_dataLen + dataLength) / _bufferLength) * _bufferLength
  let _tempBuffer = Buffer.alloc(newLength)

  // 将旧数据复制到新buffer并且修正相关参数
  if (_writePointer < _readPointer) {
    // 数据存储在旧buffer的尾部+头部的顺序
    let dataTailLen = _bufferLength - _readPointer
    _buffer.copy(_tempBuffer, 0, _readPointer, _readPointer + dataTailLen)
    _buffer.copy(_tempBuffer, dataTailLen, 0, _writePointer)
  } else {
    // 数据是按照顺序进行的完整存储
    _buffer.copy(_tempBuffer, 0, _readPointer, _writePointer)
  }
  _bufferLength = newLength
  _buffer = _tempBuffer
  _tempBuffer = null
  _readPointer = 0
  _writePointer = _dataLen

  //存储新到来的buffer
  buffer.copy(_buffer, _writePointer, dataReadStart, dataReadStart + dataLength)
  _dataLen += dataLength
  _writePointer += dataLength
} else if (_writePointer + dataLength > _bufferLength) {
  // 空间够用情况下，但是数据会冲破缓冲区尾部，部分存到缓冲区旧数据后，一部分存到缓冲区开始位置
  // 缓冲区尾部剩余空间的长度
  let bufferTailLength = _bufferLength - _writePointer

  // 数据尾部位置
  let dataEndPosition = dataReadStart + bufferTailLength
  buffer.copy(_buffer, _writePointer, dataReadStart, dataEndPosition)

  // data剩余未拷贝进缓存的长度
  let restDataLen = dataLength - bufferTailLength
  buffer.copy(_buffer, 0, dataEndPosition, dataLength)

  _dataLen = _dataLen + dataLength
  _writePointer = restDataLen
} else {
  // 剩余空间足够存储数据，直接拷贝数据到缓冲区
  buffer.copy(_buffer, _writePointer, dataReadStart, dataReadStart + dataLength)
  _dataLen = _dataLen + dataLength
  _writePointer = _writePointer + dataLength
}

// 3. 取出缓冲区所有完整数据包（收到的buffer入缓冲区后）
let _dataHeadLen = 4
timer && clearInterval(timer)
timer = setInterval(() => {
  // 缓冲区数据不够解析出包头
  if (_dataLen < _dataHeadLen) {
    console.log('数据长度小于包头规定长度，等待数据......')
    clearInterval(timer)
  }
  // 解析包头长度
  // 尾部最后剩余可读字节长度
  let restDataLen = _bufferLength - _readPointer
  let dataLen = 0
  let headBuffer = Buffer.alloc(_dataHeadLen)
  // 数据包为分段存储，不能直接解析出包头，先拼接
  if (restDataLen < _dataHeadLen) {
    // 取出第一部分头部字节
    _buffer.copy(headBuffer, 0, _readPointer, _bufferLength)
    // 取出第二部分头部字节
    let unReadHeadLen = _dataHeadLen - restDataLen
    _buffer.copy(headBuffer, restDataLen, 0, unReadHeadLen)
    dataLen = headBuffer.readUInt32BE(0)
  } else {
    _buffer.copy(headBuffer, 0, _readPointer, _readPointer + _dataHeadLen)
    dataLen = headBuffer.readUInt32BE(0)
  }

  // 数据长度不够读取，直接返回
  if (_dataLen - _dataHeadLen < dataLen) {
    log.info('缓冲区已有body数据长度小于包头定义body的长度，等待数据......')
    clearInterval(timer)
  } else {
    // 数据够读，读取数据包
    let package = Buffer.alloc(dataLen)
    // 数据是分段存储，需要分两次读取
    if (_bufferLength - _readPointer < dataLen) {
      let firstPartLen = _bufferLength - _readPointer
      // 读取第一部分，直接到字符尾部的数据
      _buffer.copy(package, 0, _readPointer, firstPartLen + _readPointer)
      // 读取第二部分，存储在开头的数据
      let secondPartLen = dataLen - firstPartLen
      _buffer.copy(package, firstPartLen, 0, secondPartLen)
      _readPointer = secondPartLen //更新可读起点
    } else {
      // 直接读取数据
      _buffer.copy(package, 0, _readPointer, _readPointer + dataLen)
      _readPointer += dataLen //更新可读起点
    }

    _dataLen -= readData.length //更新数据长度
    // 已经读取完所有数据
    if (_readPointer === _writePointer) {
      clearInterval(timer)
    }

    //开始解包
    callback(package)
  }
}, 50)

// 4. 拆包得到数据
let headBytes = 4
let head = new Buffer(headBytes)
buffer.copy(head, 0, 0, headBytes)
let dataLen = head.readUInt32BE()
const body = new Buffer(dataLen)
buffer.copy(body, 0, headBytes, headBytes + dataLen)

let content = null
try {
  const str = body.toString('utf-8')
  if (str === '') {
    content = null
  } else {
    content = JSON.parse(body)
  }
} catch (e) {
  log.error('head指定body长度有问题')
}
//传递给业务层
callback(content)


