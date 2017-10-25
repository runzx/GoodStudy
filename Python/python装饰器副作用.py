'''
    装饰器副作用
        f1.__name__ 会变成wrapper
        会让函数名改变， 要不变， 得如下处理：

'''
import time
from functools import wraps 

def decorator(func):
    @wraps(func)
    def wrapper(*args, **kw):
        print(time.time())
        func(*args, **kw)
    return wrapper

@decorator
def f1(param1,param2):
    print('this is function 1'+param1+param2)
