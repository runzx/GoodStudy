// 1. 字符串转化为数组
a = 'CN|云南|昆明|None|CMNET|0|0'
b = a.split('|')
// 生成数组b[0].....
res = ['CN', '云南', '昆明', 'None', 'CMNET', '0', '0']

// 2. 数组转换为字符串和数组元素实现反转
//    将一个数组用指定的连接号链接成一个字符串。
arrObj.join()
str = arr.join('-')
// 3. 数组中各元素颠倒顺序。
arrObj.reverse()

// 4. 截断
str = '0123456'
str.slice(0, 3) //      '012'
str.substring(2, 5) //  '234'
str.substr(2, 3) //     '234'
