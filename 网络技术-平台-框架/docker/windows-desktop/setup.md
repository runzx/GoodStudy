# Docker Desktop for Windows 
0.  64 位版本的 Windows 10 Pro，且必须开启 Hyper-V（若版本为 v1903 及以上则无需开启 Hyper-V），或者 64 位版本的 Windows 10 Home v1903 及以上版本

1. download `https://hub.docker.com/editions/community/docker-ce-desktop-windows/`  455MB  2.5.0.1(49550)

2. 镜像加速
  windows :Settings : Docker Engine :json 
```json
{
  "registry-mirrors": [
    "https://7fff2b1x.mirror.aliyuncs.com",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ]
}
```