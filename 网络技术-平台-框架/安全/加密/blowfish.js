// blowfish算法处理数据是 8B(64bit)倍数，不足要补齐
// iv =8B

const encode = buf => {
  const iv = genKey(6)
  const cipher = crypto.createCipheriv('blowfish', key, iv)

  let encrypted = cipher.update(fill8(buf), 'utf8', 'base64')
  return iv + encrypted + cipher.final('base64')
}
