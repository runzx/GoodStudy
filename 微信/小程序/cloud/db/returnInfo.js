let res

get()
res = {
  data: [{}], // 没查询到为空 length=0
  errMsg: 'collection.get:ok'
}

update() // $set 不影响其它字段
res = {
  stats: { updated: 0 },
  errMsg: 'document.update:ok'
}

add()
res = {
  _id: '23db0a155dbef7590111949a116ff9be',
  errMsg: 'collection.add:ok'
}

remove()
res = {
  stats: { removed: 0 },
  errMsg: 'document.remove:ok'
}
