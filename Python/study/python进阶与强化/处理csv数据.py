'''
处理csv数据
    标准库里csv模块，reder() writer()

'''
# from urllib import urlretrieve        # Python2
import csv
from urllib.request import urlretrieve  # python3
'''参数  urlretrieve(url, filename=None, reporthook=None, data=None)
    finename 指定了保存本地路径（如果参数未指定，urllib会生成一个临时文件保存数据。）
    reporthook 是一个回调函数，当连接上服务器、以及相应的数据块传输完毕时会触发该回调，我们可以利用这个回调函数来显示当前的下载进度。
    data 指 post 到服务器的数据
    该方法返回一个包含两个元素的(filename, headers)元组，filename 表示保存到本地的路径，header 表示服务器的响应头。
    例：local_filename, headers = urllib.request.urlretrieve('http://python.org/')
'''
urlretrieve('http://table.finance.yahoo.com/table.csv?s=000001.sz', 'pingan.csv')

'''csv.reader 返回迭代对象，每个对象应为csv文件的一行
    reader(iterable [, dialect='excel'] [optional keyword args])
    csv.writer
    csv_writer.writerow(row)    # 写一行
    csv_writer.writerows(rows)  # 写多行
'''
with open('pingan.csv', 'r') as f:
  reader = csv.reader(f)
  with open('pingan2.csv') as wf:
    writer = csv.writer(wf)
    # 读取csv文件标题行
    headers = reader.next()

    writer.writerow(headers)
    # reader是迭代对象，直接用for处理
    for row in reader:
      # 判断时期
      if row[0] < '2016-01-01':
        break
      # 判断金额
      if int(row[5]) >= 500000:
        writer.writerow(row)
