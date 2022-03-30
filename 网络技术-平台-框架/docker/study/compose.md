# compose 
1. 实现对 Docker 容器集群的快速编排
2. 通过一个单独的 docker-compose.yml 模板文件（YAML 格式）来定义一组相关联的应用容器为一个项目（project）。
   1. 服务 (service)：一个应用的容器，实际上可以包括若干运行相同镜像的容器实例。
   2. 项目 (project)：由一组关联的应用容器组成的一个完整业务单元，在 docker-compose.yml 文件中定义
3. docker-compose.yml 主模版文件
```yml
version: '3'
services:
  web:
    build: .
    ports:
      - "5000:5000"

  redis:
    image: "redis:alpine"
```
4. 运行 compose 项目 
   1. docker-compose up