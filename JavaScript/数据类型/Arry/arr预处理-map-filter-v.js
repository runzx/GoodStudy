var helpers = {
  // 判断是否有时间参数
  hasTime: i => {
    return !isNaN(parseInt(i.stamp))
  },
  // 时间转换处理
  parseTime: i => {
    i.time = new Date(i.stamp + '000')
    return i
  }
}
net.get('/Index/getList', (res = {}) => {
  let {
    status,
    data: { list }
  } = res
  this.set({
    list: list
      .filter(helpers.hasTime) // 筛选掉没有时间戳字段的数据
      .map(helpers.parseTime) // 将时间戳字段转化为 JS 的 Date 对象
  })
})
