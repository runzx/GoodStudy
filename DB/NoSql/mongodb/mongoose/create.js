
const res= await User.create({bis_id,openid})
  // 触发 save中间件，所有默认字段都按schema生成

const res = await User.findOneAndUpdate(
      { openid: wxResult.openid, bis_id  },
      { bis_id },
      { new: true, upsert: true },
    )
  // 等同于MongoDB的findAndModify更新命令。，
  // 触发 findOneAndUpdate()中间件
  // res 建新文档时，只有 {openid,bis_id}2个字段， schema里的其它默认不会生成