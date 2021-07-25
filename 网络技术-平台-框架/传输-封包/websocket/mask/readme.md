## Mask: 1 个比特。

表示是否要对数据载荷进行掩码操作。  
从客户端向服务端发送数据时，需要对数据进行掩码操作；  
从服务端向客户端发送数据时，不需要对数据进行掩码操作。  

如果服务端接收到的数据没有进行过掩码操作，服务端需要断开连接。  

如果 Mask 是 1，那么在 Masking-key 中会定义一个掩码键（masking key），并用这个掩码键来对数据载荷进行反掩码。所有客户端发送到服务端的数据帧，Mask 都是 1。  

```
  0                   1                   2                   3
  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1
 +-+-+-+-+-------+-+-------------+-------------------------------+
 |F|R|R|R| opcode|M| Payload len |    Extended payload length    |
 |I|S|S|S|  (4)  |A|     (7)     |             (16/64)           |
 |N|V|V|V|       |S|             |   (if payload len==126/127)   |
 | |1|2|3|       |K|             |                               |
 +-+-+-+-+-------+-+-------------+ - - - - - - - - - - - - - - - +
 |     Extended payload length continued, if payload len == 127  |
 + - - - - - - - - - - - - - - - +-------------------------------+
 |                               |Masking-key, if MASK set to 1  |
 +-------------------------------+-------------------------------+
 | Masking-key (continued)       |          Payload Data         |
 +-------------------------------- - - - - - - - - - - - - - - - +
 :                     Payload Data continued ...                :
 + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
 |                     Payload Data continued ...                |
 +---------------------------------------------------------------+
 ```

 ### 掩码算法
掩码键（Masking-key）是由客户端挑选出来的 32 位的随机数。掩码操作不会影响数据载荷的长度。掩码、反掩码操作都采用如下算法：  

首先，假设：  

original-octet-i：为原始数据的第 i 字节。  
transformed-octet-i：为转换后的数据的第 i 字节 。  
j：为i mod 4的结果。  
masking-key-octet-j：为 mask key 第 j 字节。  
算法描述为： original-octet-i 与 masking-key-octet-j 异或后，得到   transformed-octet-i。  

```
j = i MOD 4  

transformed-octet-i = original-octet-i XOR masking-key-octet-j  
```
