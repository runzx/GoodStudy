# 多线程

1. cluster、child_process API 创建子进程
   - 牺牲共享内存，并且数据通信必须通过 json 进行传输
   - 子进程间通过事件消息来传递结果
   -
2. worker_threads nodejs v10.5+

   - 比 child_process 或 cluster 更轻量级
   - 可以共享内存，通过传输 ArrayBuffer 实例或共享 SharedArrayBuffer 实例

3. JavaScript 和 Node.js 永远不会有线程，只有基于 Node.js 架构的多工作线程。
4. 内置模块 cluster
   - 创建共享服务器端口的子进程
   - 一个父进程管理一堆子进程的方式来实现集群的功能
   - cluster 底层就是 child_process
   - worker 进程通过使用 child_process.fork() 函数，基于 IPC（Inter-Process Communication，进程间通信），实现与 master 进程间通信。
5. child_process 模块

   - 多个子进程之间可以共享内存空间
   - child_process.spawn()：适用于返回大量数据，例如图像处理，二进制数据处理
     - 执行的是非 node 程序，提供一组参数后，执行的结果以流的形式返回。
     -
   - child_process.exec()：产生一个 shell 并在该 shell 中运行命令，stdout 并 stderr 在完成时将和传递给回调函数。
     - 执行的是非 node 程序，提供一组 shell 命令，执行的结果以回调的形式返回
   - child_process.execFile()：类似于 exec()，不同之处在于它默认情况下直接生成命令而无需生成新的 shell
     - 执行的是非 node 程序，提供一组参数后，执行的结果以回调的形式返回。
     -
   - child_process.fork()： 产生一个新的 Node.js 进程，并使用建立的 IPC 通信通道调用指定的模块，该通道允许在父级和子级之间发送消息。生成的 Node.js 子进程独立于父进程，拥有自己的内存，并带有自己的 V8 实例。
     - 执行的是 node 程序，提供一组参数后，执行的结果以流的形式返回

6. Workers (threads)
   - 对于执行 CPU 密集型的 JavaScript 操作非常有用
   - 对 I/O 密集型工作没有多大帮助。js 的内置异步 I/O 操作比 Workers 效率更高
   - 可以共享内存。 它们通过传输 ArrayBuffer 实例或共享 SharedArrayBuffer 实例来实现。
   -
7. 进程（process）和线程（thread）
   - CPU 所能处理的单个任务。任一时刻，CPU 总是运行一个进程，其他进程处于非运行状态
   - 线程就好比车间里的工人。一个进程可以包括多个线程
   - 启动一个服务、运行一个实例，就是开一个服务进程
   - 线程是操作系统能够进行运算调度的最小单位
   - 有大量计算，CPU 耗时的操作时候，要注意考虑开启多进程
   -
