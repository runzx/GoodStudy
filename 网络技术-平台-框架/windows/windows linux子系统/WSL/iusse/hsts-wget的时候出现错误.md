# iessue

```
yuki12:~$ wget https://google.co.jp/
Will not apply HSTS. The HSTS database must be a regular and non-world-writable file.
ERROR: could not open HSTS store at '/home/yuki12/.wget-hsts'. HSTS will be disabled.
```

`chmod 660 ~/.wget-hsts`