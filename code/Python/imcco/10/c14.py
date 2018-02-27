'''
python 正则替换
    convert(value) value是对象: <_sre.SRE_Match object; span=(6, 8), match='C#'>
        返回结果作为替换字符串
'''
import re
lanuage = 'PythonC#JavaC#PHPC#'

def convert(value):
    print(value)
    matched = value.group() # 查找的字符串
    # return 'Pasico'

print('~~~~~~~~~~~~~~~ re.sub ~~~~~~~~~~~~~~~~~~~~~~')
res = re.sub('C#', convert, lanuage)
print(res)
