# Dockerfile 
1. 每个指令会建立一层 commit, 多指令最好合并写条
## 命令
1. FROM 基础镜像
2. RUN 执行命令(容器内F)
  
3. CMD 启动容器时执行 

## 构建 镜像
1. docker build -t pd123:v1 .
   1. 当前目录下有 Dockerfile