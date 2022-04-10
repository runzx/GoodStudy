<!--
 * @Author: zhaix
 * @Date: 2022-03-28 11:14:21
 * @LastEditTime: 2022-04-10 10:21:12
 * @LastEditors: Do not edit
 * @FilePath: \goodstudy\网络技术-平台-框架\windows\windows linux子系统\wsl 导入导出.md
 * @Description: 
-->
# 导出类似, docker的导出, 方便移动等
1.  wsl --export Ubuntu D:/ubuntu.tar
    1.  D:/ubuntu_dir : 导入到那个目录，导入成功，有 ext4.vhdx 文件
2.  wsl --import Ubuntu D:/ubuntu_dir  D:/ubuntu.tar
3.  wsl --import Ubuntu d:\ubuntu_dir  d:\ubuntu.tar --version 2  // WSL2

