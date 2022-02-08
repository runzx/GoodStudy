# global path setup

`yarn global add tsc`

1. `yarn global bin` 查看 bin 目录:
   - `C:\Users\runzx\AppData\Local\Yarn\bin`
   - `yarn config set prefix D:\\codeing\\tools\\yarn\\cache` # 会自动设置成 D:\codeing\tools\yarn\cache\bin
2. `yarn cache dir` 缓存目录
   - `~\AppData\Local\Yarn\Data\Cache\v6` # v6 自动加上
   - `yarn config set cache-folder cache-path`
3. `yarn global dir` 全局目录
   - `~\AppData\Local\Yarn\Data\global`
   - `yarn config set global-folde global-path`
4. windows

5. linux

`export PATH=$PATH:/the/path/to/yarn/global/bin/`

## yarn 配置文件

1. ~/.yarnrc
