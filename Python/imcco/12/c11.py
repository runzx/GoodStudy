'''
装饰器
    传递参数， 通过可变参数 来支持 各种参数
    args 通用叫法， 一组参数
    kw key word 关键字参数
'''
import time

def decorator(func):
    def wrapper(*args, **kw):
        print(time.time())
        func(*args, **kw)
    return wrapper

@decorator
def f1(param1,param2):
    print('this is function 1'+param1+param2)

@decorator
def f3(param1,param2,**kw):
    print('this is function 3'+param1+param2)
    print(kw)

# 不改变原来调用方式！
# AOP 的思想
f1('test','test2')
f3('test1', 'test2', a=1, b=2, c=3)
# f = decorator(f1)
# f()

# ES6 JS class 语法糖