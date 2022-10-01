
/**
 * POST
 * 编辑设备
 * api/equip/editEquip
 * id 设备id
 */
export async function editEquip(req: any, res: any) {
  if (!req.body.id) {
    return mongooseTool.sendRes(false, '请传入设备id', res)
  }

  const equip = await EquipmentModel.findById(req.body.id)

  // 如果未查询到设备，或者设备表中找不到关联填写区的ID(可能是人为误删之类)
  // 都要报错
  if (!equip) {
    return mongooseTool.sendRes(false, '找不到该设备', res)
  } else if (!equip.allZoneID) {
    return mongooseTool.sendRes(false, '数据出错', res)
  }

  const session = await mongoose.connection.startSession()

  // 开始事务处理
  await session.withTransaction(async () => {
    equip.unitCostTarget = req.body.unitCostTarget ?? 0

    const allZone = await AllZoneModel.findById(equip.allZoneID).session(session)
    allZone.AutoWHInnerleft = req.body.AutoWHInnerleft ?? 0
    allZone.BSInner = req.body.BSInner ?? 0
    allZone.ManualStations = req.body.ManualStations ?? 0

    // 设备总数=填写区域数量累加
    equip.num = allZone.AutoWHInnerleft + allZone.BSInner + allZone.ManualStations

    // Unit Cost Target>0时，GPA差距=（Unit Cost Target-单位成本）/单位成本；
    // Unit Cost Target=0时，CPA差距为空
    // 合计成本目标：假如Unit Cost Target > 0，等于Unit Cost Target*物料总数，假如Unit Cost Target <=0，等于单位成本 *总数。
    if (equip.unitCostTarget > 0) {
      equip.gap = equip.unitCost > 0 ? compute.Div(compute.Sub(equip.unitCostTarget, equip.unitCost), equip.unitCost, 2) : 0
      equip.costTarget = compute.Mul(equip.unitCostTarget, equip.num)
    } else {
      equip.gap = 0
      equip.costTarget = compute.Mul(equip.unitCost, equip.num)
    }

    equip.cost = equip.costTarget

    // If you get a Mongoose document from findOne() or find() using a session,
    // the document will keep a reference to the session and use that session for save().
    // 由于equip不是通过session查询到的，所以如果不加{session}，那么equip.save不会被认为是事务的一部分，我们需要手动加上
    await equip.save({ session })

    // allZone是通过session查询到的，所以可以不加{session}，文档会自动使用该session来执行save操作，被认为是事务的一部分
    await allZone.save()

    // 故意报个错，会进入到catch，不会执行成功的语句，最终执行endSession
    // throw new Error('Oops')

    mongooseTool.sendRes(true, equip, res)
  }).catch(err => {
    console.log(`editEquip接口报错了 ${err.message}`)
    mongooseTool.sendRes(false, '编辑设备失败', res)
  })
  session.endSession();
}