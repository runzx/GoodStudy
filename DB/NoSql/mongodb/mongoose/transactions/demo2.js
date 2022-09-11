/**
   * POST
   * 获取填写区域
   * api/equip/getInputs
   * id 设备id
   */
export async function getInputs(req: any, res: any) {
  if (!req.body.id) {
    return mongooseTool.sendRes(false, '请传入必要参数', res)
  }

  const session = await mongoose.connection.startSession()
  session.startTransaction()

  try {
    const equip = await EquipmentModel.findById(req.body.id).session(session)
    // 如果未查询到设备则报错
    if (!equip) {
      return mongooseTool.sendRes(false, '找不到该设备', res)
    }

    // 如果没有需要新增一个
    if (!equip.allZoneID) {
      const allZone = new AllZoneModel({
        _id: new mongoose.Types.ObjectId(),
        AutoWHInnerleft: 0,
        BSInner: 0,
        ManualStations: 0
      })

      await allZone.save({ session })

      equip.allZoneID = allZone._id

      await equip.save({ session })

      // 故意报个错
      // throw new Error('Oops')

      await session.commitTransaction()

      mongooseTool.sendRes(true, allZone, res)
    } else {
      // 如果找到了直接返回
      const allZone = await AllZoneModel.findById(equip.allZoneID).exec()
      mongooseTool.sendRes(true, allZone, res)
    }
  } catch (err) {
    mongooseTool.sendRes(false, '获取设备失败', res)
  } finally {
    session.endSession()
  }
}