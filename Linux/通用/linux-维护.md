# linux 维护
1. 查看 hd: `df -h`
2. 查看 各目录 大小: `sudo du -hc --max-depth=1 /home`
3. 批量kill: ` ps -ef|grep .vscode-server |awk '{print $2}'| xargs kill -9 `