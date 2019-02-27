bcryptjs是一个第三方密码加密库，是对原有bcrypt的优化，优点是不需要安装任何依赖
// 最大输入长度为 72字节( 请注意，UTF8编码字符最多使用 4字节)，
  // 生成的哈希长度为 60个字符。
  const bcrypt = require('bcryptjs')
  // 生成hash
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync("B4c0/\/", salt)
  // 密码验证
  bcrypt.compareSync("B4c0/\/", hash); // true 
  bcrypt.compareSync("not_bacon", hash); // false 