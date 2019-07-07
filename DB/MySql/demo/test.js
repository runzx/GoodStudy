async getLast(){
  const res=await this.getData({
    url:'classic/last'
  })
  ... // 数据处理
  return res
}
