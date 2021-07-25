# import * 时只能导出下面定义的
__all__ = ['a']

a = b = 1
b = 2
print(a)
