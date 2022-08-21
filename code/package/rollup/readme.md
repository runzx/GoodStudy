# rollup

1. 生成 类库
2. tree shaking 摇树 去掉用不到的包或方法， 减少体积
3. 面向 es module, 构建结构扁平、性能出众的类库
   1. import 只能模块顶层出现，不能在 function 或 if 里
   2. 模块名只能是字符串常量
   3. 模块初始化时所有 import 都必须已经导入
   4. 可以被静态分析
4. 配置简单
