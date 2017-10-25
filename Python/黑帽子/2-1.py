'''
    TCP客户端
'''
import socket

target_host = '127.0.0.1'   # 'www.bosstg.cn'
target_port = 9999

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

client.connect((target_host,target_port))
#  网络传输时，str要转换成 b'xxx' 单字节字符串, python3的str 默认为u'xxx' unicode编码 
client.send(b'GET / HTTP/1.1\r\nHost: 127.0.0.1\r\n\r\n')

response = client.recv(4096)

print(response)
