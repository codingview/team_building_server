# team_building_server
team building server

## 团队建设系统

## 项目说明
- 所有的`_test.js`均为测试文件，无功能性意义
- 接口采用`RESFUL`原则,`get`使用`post`替代
- 接口采用 匿名参数 原则,`router`层将前端参数转换为DB参数后调用`service`中相关方法完成读写

## 主要功能点
> 见[doc/information.md](./doc/information.md)
### 优化级解决方案
  - 涉及富文本的处理
    - 每个产品、文章生成一个md5值`A`
    - 上传富文本，保存富文本到`A.html`中
    - 存储路径到mysql中

## 项目启动说明

### 服务端运行
- `git clone` 项目
  ```
  git clone https://github.com/codingview/team_building_server.git
  ```
- 安装 `node modules`
  ```
  npm install 
  ```
- 启动 `redis`
- DB表结构创建及数据初始化  
  - 查看 `config/config_development` 中 mysql 配置信息
  - 新增 `username` 和 `password` 对应的用户
  - 给予数据库操作权限
  - 在localhost的mysql中创建 `team_building` 数据库，字符集 `utf8 -- UTF-8 Unicode`，排序规则 `utf8_general_ci`
  - 建表1:执行 `sql` 文件夹下所有sql文件
  - 建表2:执行(`node`) `service/init/index.js`

### 开发端配置
- 安装`eslint`
  ```
  npm install -g eslint
  ```
- 安装`google-eslint`规则
  ```
  npm install -g eslint-config-google
  ```
- `WebStorm` 配置 `eslint` ......(略)
- Scss >> CSS : `WebStorm`配置`file watcher`
  ```
  --no-cache  --style compressed --update $FileName$:$FileNameWithoutExtension$.min.css
  ```
- `webpack` 自动监听
  ```
  webpack --watch
  ```

## TODO list
- 修改前端页面，admin中header的链接，隐藏不活动的链接地址
- 修改数据库中假数据
- 完成新闻管理页面的开发
- 查看image2中关于图片压缩的配置，减少图片的大小和压缩比


***
