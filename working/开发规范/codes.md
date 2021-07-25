codes[0] = ok
codes[999] = 服务器未知异常

codes[10000] = 通用错误


999 UnknownException  服务器未知错误  500
10000 AuthFailed  认证失败  401 
10006 Forbbiden 禁止访问  403

10020 NotFound  资源不存在  404
10030 ParametersException 参数错误  400
10040 InvalidTokenException 令牌失效  401
10050 ExpiredTokenException 令牌过期  401
10060 RepeatException 字段重复  400
10070 ForbiddenException  权限不够,不可操作 401
10080 MethodNotAllowed  请求方法不允许  405
10100 RefreshException  refresh token 获取失败  401
10110 FileTooLargeException 文件体积过大  413
10120 FileTooManyException  文件数量过多  413
10130 FileExtensionException  文件扩展名不符合规范  406
10140 LimitException  请求过于频繁，请稍后重试  401
12000 UserException 用户不存在  404

codes[10001] = 通用参数错误
codes[10002] = 资源未找到
codes[10003] = 没有找到合适的登陆处理方法
codes[10004] = 令牌不合法或者过期
codes[10005] = 用户未被授权
codes[10006] = 登陆失败

codes[20000] = 用户类通用错误
codes[20001] = 用户已存在
codes[20002] = 用户不存在
codes[20003] = 用户密码错误
codes[20004] = 获取用户wx openid失败

codes[30000] = 商品类通用错误
codes[30001] = 分类不存在
codes[30002] = 商品信息不存
codes[30003] = 主题不存在
codes[30004] = complexity参数错误
codes[30005] = Banner类资源不存在
codes[30006] = 当前暂不支持级联获取sku-list
codes[30007] = 当前暂不支持级联获取spu-list，请调用其他接口
codes[30008] = 当前没有更多的商品信息了
codes[30009] = Grid分类不存在
codes[30010] = 请求的单品列表不存在
codes[30011] = 请求的商品SaleExplain不存在

codes[40000] = 活动与优惠券通用错误
codes[40001] = 未找到首页优惠券活动
codes[40002] = 未找到商品可用优惠券
codes[40003] = 未找到活动封面
codes[40004] = 未找到优惠券
codes[40005] = 优惠券已过期
codes[40006] = 您已经领取了这张优惠券
codes[40007] = 优惠券已被使用，不能重复使用
codes[40008] = 优惠券不满足使用条件
codes[40009] = 不支持的优惠券类型
codes[40010] = 未找到优惠券对应的活动
codes[40011] = 优惠券只存在可使用/已使用/已过期的情况
codes[40012] = 优惠券核销失败

codes[50000] = 订单通用类错误
codes[50001] = 订单中有商品已售罄
codes[50002] = 订单中有已下架商品
codes[50003] = 订单中有商品库存不足
codes[50004] = 订单中有商品超出了购买上限
codes[50005] = 订单金额与实际金额不匹配,可能某些商品价格有浮动
codes[50006] = 用户没有这张优惠券
codes[50007] = 订单中的商品数量不能是0件
codes[50008] = 订单优惠金额与实际优惠金额不匹配
codes[50009] = 订单不存在
codes[50010] = 订单已过期
codes[50011] = 我们商品并不免费~