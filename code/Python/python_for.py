'''
for
主要用于遍历、循环 序列或集合、字典

'''
# for target_list in expression_list:
#     pass

# 重复的循环：for each
for x in range(0,10,2):     # range(10,0,-2)
    print(x, end=' | ')     # end='' 不换行！

a = [1,2,3,4,5,6,7,8]
# 打印间隔
print('\n打印间隔 方法1')
for x in a:
    if x%2 == 1:
        print(x, end=' | ')

# 方法2
print('\n方法2')
for x in range(0, len(a), 2):
    print(a[x], end=' | ')
# 方法3 列表切片？
print('\n方法3')
b = a[0:len(a):2]
print(b)
