'''

'''
import re
lanuage = 'PythonC#JavaC#PHPC#'

def convert(value):
    print(value)
    # return 'Pasico'

print('~~~~~~~~~~~~~~~ re.sub ~~~~~~~~~~~~~~~~~~~~~~')
res = re.sub('C#', convert, lanuage)
print(res)
