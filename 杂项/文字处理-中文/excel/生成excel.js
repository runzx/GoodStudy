const xlsx = require('xlsx')
let arrayData = [
  ['name', 'age'],
  ['zhangsan', 20],
  ['lisi', 21],
  ['wangwu', 22],
  ['zhaoliu', 23],
  ['sunqi', 24],
]

let jsonData = [{
  name: "zhangsan1",
  age: 30
}, {
  name: "lisi1",
  age: 31
}, {
  name: "wangwu1",
  age: 32
}, {
  name: "zhaoliu1",
  age: 33
}, {
  name: "sunqi1",
  age: 34
}]

// 将数据转成workSheet
let arrayWorkSheet = xlsx.utils.aoa_to_sheet(arrayData)
let jsonWorkSheet = xlsx.utils.json_to_sheet(jsonData)
// console.log(arrayWorkSheet);
// console.log(jsonWorkSheet);
// 构造workBook
let workBook = {
  SheetNames: ['arrayWorkSheet', 'jsonWorkSheet'],
  Sheets: {
    'arrayWorkSheet': arrayWorkSheet,
    'jsonWorkSheet': jsonWorkSheet,
  }
}
// 将workBook写入文件
xlsx.writeFile(workBook, "./aa.xlsx")

/**
 * 
输入：
aoa_to_sheet    将JS数据数组的数组转换为工作表。
json_to_sheet   将JS对象数组转换为工作表。
table_to_sheet  将DOM TABLE元素转换为工作表。
sheet_add_aoa   将JS数据数组添加到现有工作表中。
sheet_add_json  将JS对象数组添加到现有工作表中。
出口：
sheet_to_json   将工作表对象转换为JSON对象数组。
sheet_to_csv    生成定界符分隔值输出。
sheet_to_txt    生成UTF16格式的文本。
sheet_to_html   生成HTML输出。
sheet_to_formulae 生成公式列表（具有值后备）。
 */

// 取页面中所有table, 生成sheet插入文件
var tables = document.getElementsByTagName("table");
var wb = XLSX.utils.book_new();
for(var i = 0; i < tables.length; ++i) {
  var ws = XLSX.utils.table_to_sheet(tables[i]);
  XLSX.utils.book_append_sheet(wb, ws, "Table" + i);
}