const path = require('path')
const http = require('http')
const { Transform, finished } = require('stream')

const archiver = require('archiver')

const CRLF = '\r\n'
const boundarySymbol = Array.apply(null, { length: 24 }).map(i => {
  return Math.floor(Math.random() * 10).toString(16)
}).join('')
const contentType = `multipart/form-data; boundary=${boundarySymbol}`

let firstPipe = true
const pipeLine = new Transform({
  transform(chunk, encoding, callback) {
    let toSendChunk = chunk
    if (firstPipe) {
      firstPipe = false
      toSendChunk = Buffer.concat([
        Buffer.from(`--${boundarySymbol}${CRLF}`, 'utf8'),
        Buffer.from(`Content-Disposition: form-data; name="your_key_1"; filename="your_file_name.zip"${CRLF}`, 'utf8'),
        Buffer.from(`Content-Type: application/zip${CRLF}${CRLF}`, 'utf8'),
        chunk
      ])
    }
    callback(null, toSendChunk)
  },
  flush(callback) {
    // file ended
    this.push(Buffer.from(CRLF, 'utf8'))
    // field start
    this.push(Buffer.concat([
      Buffer.from(`--${boundarySymbol}${CRLF}`, 'utf8'),
      Buffer.from(`Content-Disposition: form-data; name="your_key_2"${CRLF}`, 'utf8'),
      Buffer.from(`Content-Type: text/plain${CRLF}${CRLF}your_value${CRLF}`, 'utf8'),
      // all ended
      Buffer.from(`--${boundarySymbol}--${CRLF}`, 'utf8')
    ]))
    callback(null)
  },
  final(callback) {
    callback(null)
  }
})

const request = http.request({
  hostname: 'localhost',
  port: '3001',
  path: '/file',
  method: 'post',
  headers: {
    'Content-Type': contentType
  }
})
request.on('response', res => {
  console.log(res.statusCode)
})

const archive = archiver('zip', {
  zlib: { level: 9 }
})
archive.pipe(pipeLine).pipe(request)
archive.directory(path.resolve('./test'), false)
archive.finalize()



// =====================================================

// 示例代码
const request = require('request')
const FormData = require('form-data')

const formData = new FormData()
formData.append('my_field', 'abc')
formData.append('my_file',
  buff,// 上面代码中 archiver 生成的 buffer
  {
    filename: 'somename.zip'// 随便写，但必须有
  }
)
formData.pipe(
  request.post({
    url: '{url_to_post}',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`
    }
  })
)