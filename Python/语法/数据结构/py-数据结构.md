# 数据结构

## 数字 number

1. int float, `type()`
2. 进制 2 进制： `0b10` `bin()` 8 进制` 0o11``oct() ` 16 进制` 0x11``hex() ` 10 进制 `int()`
3. 布尔类型 bool: `True, False`
   False: bool(''),bool([]),bool({}),bool(0),bool(None)
4. 复数 complex: `58j`

## str

```python
'str' #
"str" #
'let s" go'
'let s\' go'  # 转义字符
# 支持换行 ''' """
'''
l1
l2
'''
'l1\
l2'
b'input\n' # bytes字节符，打印以b开头。
u'input\n' # unicode编码字符，python3默认字符串编码方式。
u = '中文' # 默认情况下为unicode类型
str1 = u.encode('gb2312')  # 以gb2312编码对u进行编码，获得bytes类型对象
print(str1)
b'\xd6\xd0\xce\xc4'
str3 = u.encode('utf-8')
b'\xe4\xb8\xad\xe6\x96\x87'

print(r'c:\net\talk') # 原始字符串
'aaa'*3 # 'aaaaaaaaa'
'abc'[1] # 'b'
'abc'[-1] # 'c'
'abcd'[1:3] # 'bc'
'abcd'[1:] # 'bcd'
'abcd'[-2:] # 'ab'

```

## 列表 list (js: array)

```python
['a',1,True].append() # err!
l=['a',1,True]
l.append(4) # 这样写
# insert(), pop(), len(list)

```

## 元组 tuple 不能修改

```python
l=(1,2,'a')

# str, list ,tuple 都是序列，共同操作： [idx],切片[1:3:2]
3 in [1,2,3]
3 not in []

```

## 字典 dict 不能修改,(js: MAP)

```python

```

## 集合 set 不能修改

```python

```
