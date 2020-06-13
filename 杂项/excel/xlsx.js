const fs = require('fs')
const path = require('path')
const xlsx = require('xlsx')

function parseExcel(filename) {
  const workbook = xlsx.readFile('./import/' + filename) // 读取excel文件
  const sheetNames = workbook.SheetNames //获取表名称数组

  let wb = {
    SheetNames: [],
    Sheets: {}
  }
  // 设置头部，根据需要修改，必须加头部，否则后面无法获取准确结尾单元格值
  let _headers = ['title1', 'title2', 'title3', 'title4']
  let headers = _headers.map((v, i) => Object.assign({}, { v: v, position: String.fromCharCode(65 + i) + 1 }))
    .reduce((prev, next) => Object.assign({}, prev, { [next.position]: { v: next.v } }), {})
  for (let i = 0; i < sheetNames.length; i++) {
    let data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetNames[i]]) //通过工具将表对象的数据读出来并转成json
    data.map((item, index) => { // 这里根据具体业务来进行操作
      if (item['title1'] !== "xxx") {
        item['title2'] = new Buffer(item['title1'], 'base64').toString()
      } else {
        item['title2'] = ""
      }
    })
    let exportData = xlsx.utils.json_to_sheet(data) //通过工具将json转表对象
    let output = Object.assign({}, headers, exportData)//获取表对象，包含头
    let keys = Object.keys(output)// 获取所有的单元格名称数组
    let ref = keys[0] + ':' + keys[keys.length - 2] //定义一个字符串 也就是表的范围，左上角:右下角
    wb['SheetNames'].push(sheetNames[i])//插入sheet名称
    wb['Sheets'][sheetNames[i]] = Object.assign({}, exportData, { '!ref': ref }) //表对象，上面的sheet名称为key，对应表对象
  }
  // 给文件名称加'解密'
  filename = filename.split('.')[filename.split('.').length - 2] + '解密' + '.' + filename.split('.').pop()
  xlsx.writeFile(wb, path.resolve(__dirname, 'output', filename)) //将数据导出为excel文件
}

//读取某个路径下所有文件名
var readDir = fs.readdirSync("./import")
readDir.forEach(function (filename) {
  let fileExtension = filename.split('.').pop().toLowerCase()
  if (fileExtension === 'xlsx' || fileExtension === 'xls') {
    // 批量解析文件
    parseExcel(filename)
  }
})