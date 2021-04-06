'''
正则
'''
import re

a = 'c0c++1php2python3java4js'

res = re.findall('\D+', a)
print(res)
