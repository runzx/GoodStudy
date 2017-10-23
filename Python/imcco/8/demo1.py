from functools import reduce 

list_x = [(0,0),(1,3),(-1,2)] 
#list_x = [1,2,3,4,5,6] 
a = iter(list_x)
print(iter(list_x))
for i in a:
    print(i)


def reduce0(function, iterable, initializer=None):
    it = iter(iterable)
    if initializer is None:
        value = next(it)
    else:
        value = initializer
    for element in it:
        value = function(value, element)
    return value

r = reduce(lambda x,y:x+y,list_x) 
print(r)