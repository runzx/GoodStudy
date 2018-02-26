'''
枚举
    python3 增加的类！
'''
from enum import Enum

class VIP(Enum):
    # 定义 常量， 值不能相同！
    YELLOW = 1
    GREEN = 2
    BLACK =3 
    RED = 4

class Com():
    # 普通类 值可以改变！
    YELLOW = 1

# 输出 是 'VIP.BLACK' , 枚举要的就是变量名， 而不是内容（内容只是为区分）
print(VIP.BLACK)
print(VIP.BLACK.name)
print(VIP.BLACK.value)
print(VIP['GREEN'])