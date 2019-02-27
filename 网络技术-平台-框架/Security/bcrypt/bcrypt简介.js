bcrypt
bcrypt 使用的是布鲁斯·施内尔在1993年发布的 Blowfish 加密算法。具体来说，
    bcrypt 使用保罗·柯切尔的算法实现。随 bcrypt 一起发布的源代码对原始版本作了略微改动。
  bcrypt是一个由两个外国人根据Blowfish加密算法所设计的密码散列函数。
    实现中bcrypt会使用一个加盐的流程以防御彩虹表攻击，
    同时bcrypt还是适应性函数，它可以借由增加迭代之次数来抵御暴力破解法
  bcryptjs来替代

    mongoose:
      username: { type: String, required: true, index: { unique: true } },
      password: { type: String, required: true }
    
    // 该中间件使用pre前置钩子，在密码保存之前，自动地把密码变成hash
let SALT_WORK_FACTOR = 5
UserSchema.pre('save', function(next) {
    var user = this;

    //产生密码hash当密码有更改的时候(或者是新密码)
    if (!user.isModified('password')) return next();

    // 产生一个salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        //  结合salt产生新的hash
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // 使用hash覆盖明文密码
            user.password = hash;
            next();
        });
    });
});
  // 验证
  //   加密之后，密码原文被替换为密文了。我们无法解密，
  //   只能通过bcrypt的compare方法

  UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
  };

  // 存储在数据库中，bcrypt“hash”可能看起来像这样：

  const mm="$2a$10$vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa"

  这实际上是三个字段，由“$”分隔：

  > 2a标识所使用的bcrypt算法版本。
  > 10是成本因素;使用密钥导出函数的210次迭代(这是不够的，顺便说一句，我建议成本为12或更多)。
  > "vI8aWBnW3fID.ZQ4/zo1G.q1lRps.9cGLcZEiGDMVr5yUP1KUOYTa"是盐和密文，在修改的Base-64中连接和编码。
    前22个字符解码为盐的16字节值。其余字符是要比较以进行认证的密文。