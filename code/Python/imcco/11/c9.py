'''
函数-闭包
'''
def a():
    pass
print(type(a))

def curve_pre():
    def curve():
        print('This is a curve function')
    return curve    # 把函数curve当结果返回
f = curve_pre()
f()

def curve_pre():
    a = 2
    def curve(x):
        return a*x*x
    return curve    # 把函数curve当结果返回
f = curve_pre()
a = 10
print(f(5))
print(f.__closure__)
print(f.__closure__[0].cell_contents)