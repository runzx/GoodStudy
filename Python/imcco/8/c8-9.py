'''
任意数量的关键字参数
'''
def city_demo(**parameter_list):
    print(parameter_list)
    print(type(parameter_list))
    for c,value in parameter_list.items():
        print(c,':',value)

a = {'bj':'32c','km':'20c','sh':'31c'}
# city_demo(bj='32c',km='20c',sh='31c')
city_demo(**a)