'''
JSON 序列化
'''
import json
student = [
    {'name':'zx', 'age':18, 'flag':False},
    {'name':'mm', 'age':8}
]

json_str = json.dumps(student)
print(type(json_str))
print(json_str)