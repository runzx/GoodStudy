# docker-compose
1. Compose 是一个用于定义和运行多容器 Docker 应用程序的工具。使用 Compose，您可以使用 YAML 文件来配置应用程序的服务。然后，使用一个命令，您可以从您的配置中创建并启动所有服务
2. 使用 a 定义您的应用程序的环境，Dockerfile以便可以在任何地方复制它
3. 定义构成您的应用程序的服务，docker-compose.yml 以便它们可以在隔离环境中一起运行
4. 运行docker compose up，Docker compose 命令启动并运行您的整个应用程序。您也可以docker-compose up使用 docker-compose 二进制文件运行
5. 流式传输正在运行的服务的日志输出
6. 查看运行服务的状态
7. 启动、停止和重建服务
8. 在服务上运行一次性命令