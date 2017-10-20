'''
正则替换：函数作为参数传递
'''
import re
S = 'A83C2327G965KH2523UU765'

def convert(value):
    matched = value.group()
    if int(matched) >= 6:
        return '9'
    return '0' 

res = re.sub('\d', convert, S)
print(res)