<!--
 * @Author: zhaix
 * @Date: 2022-03-28 11:14:21
 * @LastEditTime: 2022-04-10 10:29:27
 * @LastEditors: Do not edit
 * @FilePath: \goodstudy\网络技术-平台-框架\docker\windows-desktop\setup.md
 * @Description:
-->

# Docker Desktop for Windows

## WSL2

1. https://docs.docker.com/desktop/windows/install/
2. 

### 限制 WSL2 内存、cup 占用过高

1. ~/.wslconfig

```conf
[wsl2]
proccessors=2
memory=8GB
swap=8GB
localhostForwoarding=true
```

2. reboot `wsl --shutdown`
### Docker占用C盘过大迁移
1. wsl --shutdown
2. 导出数据
   1. wsl export docker-desktop-data d:\zx\vm\wsl\docker-desktop-data.tar
   1. wsl export docker-desktop      d:\zx\vm\wsl\docker-desktop.tar
3. wsl --unregister docker-desktop; wsl --unregister docker-desktop-data
4. 导入
   1. wsl --import docker-desktop d:\zx\vm\wsl\docker-desktop d:\zx\vm\wsl\docker-desktop.tar 2
   2. wsl --import docker-desktop-data ...
##

2.  64 位版本的 Windows 10 Pro，且必须开启 Hyper-V（若版本为 v1903 及以上则无需开启 Hyper-V），或者 64 位版本的 Windows 10 Home v1903 及以上版本

3.  download `https://hub.docker.com/editions/community/docker-ce-desktop-windows/` 455MB 2.5.0.1(49550)
    1.  v4.7 510MB 2022-4-10

4.  镜像加速
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
