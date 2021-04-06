'''
计算平方和
'''
def squsum(*parameter_list):
    sum = 0
    for i in parameter_list:
        sum += i*i
    print(sum)
squsum(1,2,3,4,5,6)