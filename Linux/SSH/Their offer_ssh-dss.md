# Their offer: ssh-dss
1. ssh登录失败：no matching host key type found
2. 是因为OpenSSH 7.0以后的版本不再支持ssh-dss (DSA)算法
3. 解决办法
   1. ssh -oHostKeyAlgorithms=+ssh-dss user@legacyhost
   2. ~/.ssh/config
```
Host somehost.example.org
    HostKeyAlgorithms +ssh-dss
```