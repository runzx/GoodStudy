'''
life is short, I use python
'''
import re
S = 'life is short, I use python，I love python'

res = re.search('life(.*)python(.*)python', S)
print(res.group(0))
print(res.group(1))
print(res.group(2))
print(res.group(0,1,2))
print(res.groups())

# 列表内容是各次匹配结果， 结果里如有分组，则用元组表示
res = re.findall('life(.*)python(.*)python',S)
print(res)