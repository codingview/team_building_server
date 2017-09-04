# team_building_server
team building server

## 团队建设系统前端服务

## 主要功能点
|模块|功能点|数据源|数据结构|技术点|节点|备注|
|:---|:---|:---|:---|:---|---|---:|
|首页|banner 广告页|图床|动态|slider|||
||搜索||
||团建产品 分类||动态||
|团建产品|分类|||
|||||
|基地资源||||
|师资实力||||
|精彩案例||||
|关于我们||||

## 下载项目、安装modules
- `git clone`
  ```
  git clone https://github.com/codingview/team_building_server.git
  ```
- 安装`modules`
  ```
  npm install 
  ```

## 安装&启动项目

- 安装`eslint`
  ```
  npm install -g eslint
  ```
- 安装`google-eslint`规则
  ```
  npm install -g eslint-config-google
  ```
- `WebStorm`配置`eslint` ......
- `WebStorm`配置`file watcher`
  ```
  --no-cache  --style compressed --update $FileName$:$FileNameWithoutExtension$.min.css
  ```
  
## DB表结构创建及数据初始化  

- 查看 `config/config_development` 中 mysql 配置信息
- 新增 username 和 password 对应的用户
- 给予数据库操作权限
- 在localhost的mysql中创建 `team_building` 数据库，字符集 `utf8 -- UTF-8 Unicode`，排序规则 `utf8_general_ci`
- 执行(node) `utils/model/init.js` 