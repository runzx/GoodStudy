'''
TCP proxy

'''
import sys, socket, threading

def xrange(start, stop, step):
    '''
    python3 取消了xrange, 它返回迭代对象
    与 range 完全相同，所不同的是生成的不是一个数组，而是一个生成器。
    range()返回一个递增或递减的数字列表
        start表示列表开始的值，默认为“0”。
        stop 表示列表结束的值，该参数不可缺少
        参数step表示步长，默认值为“1”。
    xrange 是一个类，返回的是一个xrange对象。
        使用xrange()进行遍历，每次遍历只返回一个值。range()返回的是一个列表，一次性计算并返回所有的值。因此，xrange()的执行效率要高于range()
        
    '''
    return iter(range(start, stop, step))

def hexdump(src, length=16):
    '''16进制导出函数'''
    result = []
    # python2 unicode 在python3 为 str
    digits = 4 if isinstance(src, str) else 2
    # python3 取消了xrange, 它返回迭代对象
    for i in xrange(0, len(src), length):
        s = src[i:i+length]
        hexa = ' '.join(['%0*X' % (digits, ord(x)) for x in s])
        # zx 加入or ord(x) > 0xff , 为了显示汉字
        text = ''.join([x if 0x20 <= ord(x) <0x7f or ord(x) > 0xff else '.' for x in s])
        result.append('%04X %-*s %s' % (i, length*(digits+1), hexa, text))
    print('\n'.join(result))

def receive_from(Connection):
    '''套接字对象实现数据接收'''
    buffer = ''
    Connection.settimeout(10)
    try:
        while True:
            data = Connection.recv(4096)
            if not data:
                break
            buffer += data
    except :
        pass
    return buffer

def request_handler(buffer):
    '''对远程主机的进行修改'''
    return buffer

def response_handler(buffer):
    '''对本地主机的响应进行修改'''
    return buffer

def proxy_handler(client_socket, remote_host, remote_port, receive_first):
    '''代理的主体逻辑
    '''
    remote_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    remote_socket.connect((remote_host, remote_port))

    if receive_first:
        remote_buffer = receive_from(remote_socket)
        hexdump(remote_buffer)
        remote_buffer = response_handler(remote_buffer)

        if len(remote_buffer):
            print('[<==] Sending %d bytes to localhost.' % len(remote_buffer))
            client_socket.send(remote_buffer)
        while True:
            local_buffer = receive_from(client_socket)

            if len(local_buffer):
                print('[==>] Received %d bytes from localhost.' % len(local_buffer))
                hexdump(local_buffer)
                local_buffer = request_handler(local_buffer)

                remote_socket.send(local_buffer)
                print('[==>] Sent to remote')

            remote_buffer = receive_from(remote_socket)
            if len(remote_buffer):
                print('[<==] Received %d bytes from remote.' % len(remote_buffer))
                hexdump(remote_buffer)

                remote_buffer = response_handler(remote_buffer)

                client_socket.send(remote_buffer)
                print('[<==] Sent to localhost.')
            if not len(local_buffer) or not len(remote_buffer):
                client_socket.close()
                remote_socket.close()
                print('[*] No more data. Closing connectioms.')

                break


def server_loop(local_host, local_port, remote_host, remote_port, receive_first):
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    try:
        server.bind((local_host, local_port))
    except:
        print('[!!] Failed to listen on %s:%d' % (local_host,local_port))
        print('[!!] Check for other listening sockets or corrcet permissions.')
        sys.exit(0)
    print('[*] Listening on %s:%d' % (local_host, local_port))
    
    server.listen(5)

    while True:
        client_socket, addr = server.accept()

        print('s[==>] Received incoming connection from %s:%d' % (addr[0], addr[1]))
        proxy_thread = threading.Thread(target=proxy_handler, args=(client_socket, remote_host, remote_port, receive_first))

        proxy_thread.start()
    
def main():
    if len(sys.argv[1:]) != 5:
        print('Usage: ./proxy.py [localhost] [localport] [remotehost] [remotport] [receive_first]')
        print('Example: ./proxy.py 127.0.0.1 9000 True')
        sys.exit(0)
    local_host = sys.argv[1]
    local_port = int(sys.argv[2])
    remote_host = sys.argv[3]
    remote_port = sys.argv[4]
    receive_first = sys.argv[5]

    if 'True' in receive_first:
        receive_first = True
    else:
        receive_first = False
    
    server_loop(local_host, local_port, remote_host, remote_port, receive_first)

# main()

def test():
    '''测试用
    '''
    hexdump('this is str for test 你好！')
    # print(a)

test()
