'''
装饰器
'''
import time

def decorator(func):
    def wrapper():
        print(time.time())
        func()
    return wrapper

@decorator
def f1():
    print('this is function 1')
# 不改变原来调用方式！
# AOP 的思想
f1()

# f = decorator(f1)
# f()

# ES6 JS class 语法糖