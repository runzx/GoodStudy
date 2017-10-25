'''

'''
import subprocess

def run_command(command):
    '''subprocess库提供进程创建接口
    '''
    command = command.rstrip()

    try:
        output = subprocess.check_output(command, stderr=subprocess.STDOUT, shell=True)
    except:
        output = b'Failed to execute commnad.\r\n'

    # return output
    print(output)

run_command('ls\n')