# v15.5.2 Device/Credential Guard are not compatible
1. trun off Hyper-V
2. 查看状态:  hypervisorlaunchtype    Off
   1. `bcdedit /enum` 查看
   2. `bcdedit /set hypervisorlaunchtype off` 关闭
