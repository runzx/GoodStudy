# 更新依赖包

1. `yarn upgrade xxx`

   - `npm update xxx`
   - `yarn upgrade xxx@version` // 指定版本

2. all: `yarn upgrade-interactive --latest`
3. 没安装依赖包，有 package.json
   - `npm install`
4. version
   1. ~1.15.2 := >=1.15.2 <1.16.0
   2. ^3.3.4 := >=3.3.4 <4.0.0
