const xml = require('xml2js')

const x = `<xml>
<MsgId>6197906553041859764</MsgId>
</xml>`

// 原来xml2js默认会把子子节点的值变为一个数组，
// { xml: { MsgId: [ '6197906553041859764' ] } }

xml.parseString(x, { explicitArray: false }, (err, obj) => {
  console.log(obj)
})