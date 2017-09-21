# team_building_server
team building server

## 团队建设系统

## 项目说明
- 所有的`_test.js`均为测试文件，无功能性意义
- 接口采用`RESFUL`原则,`get`使用`post`替代
- 接口采用 匿名参数 原则,`router`层将前端参数转换为DB参数后调用`service`中相关方法完成读写

## 主要功能点
- ### 前台
|模块|功能点|数据源|技术点|耗时/节点|备注|
|:---|:---|:---|:---|---|---:|
|首页|frame样式|||||
||多屏懒加载|多路动态|懒加载||Ban|
||banner 广告页||slider|2017年9月15日||
||团建产品|产品、分类|tab|2017年9月17日|样式、动画|
||搜索|产品|like||Ban|
||基地资源||tab、swiper、animate|1天||
||公司新闻|服务案例|swiper、ul、animate|1天||
||合作单位|服务案例|swiper|1天||
||底部在线反馈|form||2017年9月19日||
|404、错误页面|||通用页面目标|0.5天|Delay|
|团建产品|多层分类菜单|||||
||产品列表||分页|0.5天||
||产品详情||面包屑、样式|2017年9月17日||
|基地资源|基地地址分类|||||
||基地详情||面包屑、样式|0.2天||
||基地列表||分页|0.5天||
|服务案例|案例分类|||
||案例列表||分页|0.5天||
||案例详情||面包屑、样式|0.2天||
|关于我们||静态页面|富文本|2017年9月19日||

- ### 后台
|模块|功能点|技术点|耗时/节点|备注|
|:---|:---|:---|:---|:---|
|全局配置|后台登录||2017年9月10日||
||通用参数配置||||
||管理员列表||2017年9月16日||
||新增、修改管理员||||
||反馈列表||2017年9月18日|标记处理反馈|
|首页设置|广告位设置|图片上传|||
||合作单位||图片上传||
|产品体系|分类管理||||
||产品管理||||
||新增产品|||
||修改产品|||
|服务案例|案例分类管理|||
||案例列表管理|||
||新增、修改案例详情|||
|基地资源||基地分类管理||
||基地列表管理|||
||新增、修改基地详情|||
|关于我们|静态页面|富文本|2017年9月19日|

- ### Bug&TODO list
|功能点|路径|说明|节点|备注|
|:---|:---|:---|:---|:---|
|产品分类管理||三级分类体系、3级分类不可向下新增分类|||
|框架-反馈|输入框未防注入|||

- ### 优化级解决方案
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

### 开发环境配置

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
