# ssh 端口转发
1. HostA --ssh--> HostB
2. target： HostC
## 本地端口转发
1. `ssh -L localPortA:targetHostC:portC username@sshHostB -p portB`
2. 通过 sshHostB 把本地的 A端口 转发到 targetHostC:portC 上
3. 有3方
4. localHost 可不写，默认 0.0.0.0, 如是 127.0.0.1 则只转发本地请求
   1. `ssh_config` 中 `GatewayPorts` 选项的值一般为「yes」
      1. `no` 转发仅对本地主机可用
      2. ip 客户端指定地址

##　远程端口转发
1. `ssh -R portB:targetHostC:portC username@hostB`
2. 对 portB 访问通过 hostA 转到 portC 上， 访问是反向

## 关键参数
1. `-f` 将 ssh 转到后台运行
2. `-N` 不执行脚本或命令


## 本地转发与远程转发的比与分析
1. 采取哪种端口转发主要取决于SSH连接建立的方向。
2. 而 SSH 连接是有方向的，从 SSH Client 到 SSH Server 。
    而我们的应用也是有方向的，比如需要连接 LDAP Server 时，LDAP Server 自然就是 Server 端，
        我们应用连接的方向也是从应用的 Client 端连接到应用的 Server 端。
    如果这两个连接的方向一致，那我们就说它是本地转发。
        而如果两个方向不一致，我们就说它是远程转发。
    
    本地转发时：
        LdapClientHost 同时是应用的客户端，也是 SSH Client，这两个连接都从它指向 LdapServertHost（既是 LDAP 服务端，也是 SSH Server）。
3. 命令
    ssh -C -f -N -g -L listen_port:DST_Host:DST_port user@Tunnel_Host 
        将本地机(客户机)的某个端口转发到远端指定机器的指定端口. 
        ssh -L <local port>:<remote host>:<remote port> <SSH hostname>
        ssh -N -f -L 2121:234.234.234.234:21 123.123.123.123
            现在访问本地2121端口，就能连接234.234.234.234的21端口了， 通过123.123.123.123中转
    ssh -C -f -N -g -R listen_port:DST_Host:DST_port user@Tunnel_Host 
        将远程主机(服务器)的某个端口转发到本地端指定机器的指定端口
        ssh -R <SSH host port>:<目标主机>:<目标主机port> <SSH hostname>
        ssh -R -N -f  2222:127.0.0.1:22 123.123.123.123     // 在192.168...机器上执行
            123.123.123.123上用下面的命令就可以登陆公司的IP是192.168.0.100的机器了。
                ssh -p 2222 localhost
    ssh -C -f -N -g -D listen_port user@Tunnel_Host
        指定一个本地机器 “动态的’’ 应用程序端口转发.
    
    -C 压缩数据传输
    -f 将 ssh 转到后台运行，即认证之后，ssh 自动以后台运行。不在输出信息
    -n 将 stdio 重定向到 /dev/null，与 -f 配合使用
    -N 不执行脚本或命令，即通知 sshd 不运行设定的 shell 通常与 -f 连用
    -T 不分配 TTY 只做代理用
    -q 安静模式，不输出 错误/警告 信息
    -g 允许远程 连接到listen_port 上，否则只能本地使用此端口。
    保持长时间连接
        TCPKeepAlive  yes   # sshd
        或 ssh -o TCPKeepAlive=yes
    端口绑定到外部地址上
        GatewayPorts yes    # sshd
    端口号小于1024需要root权限
4. 调试微信小程序 远程主机到本地
    在PC上 
        ssh -R  7000:127.0.0.1:3000 zhaixiang@www.bosstg.cn -p 15822
    在www.bosstg.cn 上通过nginx 把80访问转发到7000 --> 能到访问到PC上的3000主机
        upstream webnode { 
            server 127.0.0.1:3000 backup;   // 备份，7000不工作时才使用这
            server 127.0.0.1:7000; 
        }

5. 测试
    列出所有端口
        netstat -ntlp