const zlib = require("zlib")
const fs = require("fs")

const gzip = zlib.createGzip()

const rs = fs.createReadStream("./db.json")
const ws = fs.createWriteStream("./db.json.gz")
rs.pipe(gzip).pipe(ws)


const gunzip = zlib.createGunzip()

const rs = fs.createReadStream("./db.json.gz")
const ws = fs.createWriteStream("./db.json")
rs.pipe(gunzip).pipe(ws)


// ====================================================
// 使用 .tar.gz 格式文件进行流式下载解压了：
// 简单代码，未做任何异常捕获和处理
function downloadTgzStream(url, outputRepo, useMemory = false) {
  const http = require('http')
  const path = require('path')
  // third-party libraries
  const gunzip = require('gunzip-maybe')
  const tar = require('tar-stream')

  const extract = tar.extract()
  const fileList = []

  return new Promise((resolve, reject) => {
    !useMemory && fs.mkdirSync(outputRepo)
    extract.on('entry', (header, stream, next) => {
      const tempBuffer = []
      let tempPrefix = ''
      stream.on('data', function (data) {
        tempBuffer.push(data)
        tempPrefix = tempPrefix || `${header.name.split('/')[0]}/`
        const wholeBuffer = Buffer.concat(tempBuffer)
        const dataSize = Buffer.byteLength(wholeBuffer)
        const fileName = header.name.replace(tempPrefix, '')
        if (dataSize === header.size && header.type === 'file') {
          // be careful of size
          if (useMemory) {
            return fileList.push({
              fileName,
              buffer: wholeBuffer
            })
          }
          const filePath = path.join(outputRepo, fileName)
          // todo: create directory if not exists
          fs.writeFileSync(filePath, wholeBuffer)
          fileList.push(filePath)
          tempBuffer.length = 0
        }
      })
      stream.on('end', function () {
        next()
      })
      stream.resume()
    })
    extract.on('finish', () => {
      resolve(fileList)
    })

    http.get(sourceUrl, res => {
      res.pipe(gunzip()).pipe(extract)
    }).on('error', err => {
      reject(err)
    })
  })
}

// 这里注意一个文件的 on('entry')可能会触发多个on('data')，因为 stream 是分段的，每段默认 highWaterMark 是 60*1024, 超过这个尺寸的文件就会被分成多段，所以注意验证文件完整性（上面实现很简陋，最好是按照 stream 分段写入文件防止超过最大内存限制，这也是流式处理的好处，可以操作大文件）
