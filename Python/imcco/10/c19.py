'''
JSON 反序列化
'''
import json

# JSON 只能用", 下面是json object
json_str = '{"name":"zx", "age":18}'
# JSON array:
json_str = '[{"name":"zx", "age":18, "flag":false},{"name":"mm", "age":8}]'

# python 内置方法, 转成字典; 如有数组，转为列表，内容是字典 
# 这个过程 ： 反序列化
student = json.loads(json_str)
print(student)
print(type(student))