'''
装饰器
    传递参数， 通过可变参数 来支持 各种参数
    args 通用叫法， 一组参数
'''
import time

def decorator(func):
    def wrapper(*args):
        print(time.time())
        func(*args)
    return wrapper

@decorator
def f1(param1,param2):
    print('this is function 1'+param1+param2)
# 不改变原来调用方式！
# AOP 的思想
f1('test','test2')

# f = decorator(f1)
# f()

# ES6 JS class 语法糖