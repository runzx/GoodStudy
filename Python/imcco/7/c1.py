'''
for 循环

'''
a = [['apple','orange','banana','grape'], (1,2,3)]
for x in a:
    sum=0
    for y in x:
        sum+=1
        print(y,end=' | ')
        if len(x)==sum:
            print('\n\nfruit is gone')