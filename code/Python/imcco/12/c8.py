'''
装饰器
'''
import time

def decorator(func):
    def wrapper():
        print(time.time())
        func()
    return wrapper

def f1():
    print('this is function 1')

f = decorator(f1)
f()