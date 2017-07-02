<?php

1. //config.json
    {
    "AccessKeyID" : "",
    "AccessKeySecret" : "",
    "RoleArn" : "",
    "TokenExpireTime" : "900",
    "PolicyFile": "policy/all_policy.txt"
    }
    //TokenExpireTime： 指Android/iOS应用取到这个Token的失效时间，注意，最少是900s，默认值可以不修改。
    /*
    PolicyFile: 填写的是该Token所要拥有的权限列表的文件， 默认值可以不修改。
    本教程准备了三种最常用token 权限文件，放于policy目录下面。分别是:
        all_policy.txt：指定了该token拥有对该账号下创建Bucket、删除Bucket、上传文件、下载文件、删除文件的权限 。
        bucket_read_policy.txt：指定了该token拥有该账号下对指定Bucket的读权限。
        bucket_read_write_policy.txt： 指定了该token拥有该账号下对指定Bucket的读写权限。
    如果您想要指定这个Token只能对指定的bucket有读写权限， 请把（bucket_read_policy.txt、 bucket_read_write_policy.txt）这个文件里面$BUCKET_NAME直接替换成指定的bucket名字。    */
    返回的格式解析:
        {
            "status":200,
            "AccessKeyId":"STS.3pYjsdgdgagdasdg",
            "AccessKeySecret":"rpnwO9kvEgetGdrddgsR2YrTtI",
            "Security":"CAES+wMIARKAAZhjH0EUOIhJMQBMjRywXq7MQ/cjLYg80Aho1ek0Jm63XMhr9Oc5s˙∂˙∂3qaPer8p1YaX1NTDiCFZWFkvlHf1pQhuxfKBc+mRR9KAbHUefqH+rdjZqjTF7p2m1wJXP8S6k+G2MpHrUe6TYBkJ43GhhTVFMuM3BZajY3VjZWOXBIODRIR1FKZjIiEjMzMzE0MjY0NzM5MTE4NjkxMSoLY2xpZGSSDgSDGAGESGTETqOio6c2RrLWRlbW8vKgoUYWNzOm9zczoqOio6c2RrLWRlbW9KEDExNDg5MzAxMDcyNDY4MThSBTI2ODQyWg9Bc3N1bWVkUm9sZVVzZXJgAGoSMzMzMTQyNjQ3MzkxMTg2OTExcglzZGstZGVtbzI=",
            "Expiration":"2015-12-12T07:49:09Z",
        }
        status:         表示获取Token的状态，获取成功时，返回值是200。
        AccessKeyId:    表示Android/iOS应用初始化OSSClient获取的 AccessKeyId。
        AccessKeySecret: 表示Android/iOS应用初始化OSSClient获取AccessKeySecret。
        SecurityToken：  表示Android/iOS应用初始化的Token。
        Expiration:     表示该Token失效的时间。主要在Android SDK会自动判断是否失效，自动获取Token。注意上述这四个变量将构成了一个Token。