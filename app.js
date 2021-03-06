/**
 * Created by zrz on 2017/8/22.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

global.GLO = require('./utils/global');
global.option = require('./service/option').start(); // 项目启动加载配置信息

// 加载modules
const express = require('express')
    , session = require('express-session')
    , RedisStore = require('connect-redis')(session)
    , app = express()// 创建项目实例
    , bodyParser = require('body-parser')
    , path = require('path')
    , serveFavicon = require('serve-favicon')
    , config = require('./config')
    ;

require('events').EventEmitter.defaultMaxListeners = 0;

app.set('views', path.join(__dirname, '/views')); // 设置模板地址
app.set('view engine', 'ejs'); // 设置模板引擎
app.set('view cache', !GLO.isDev()); // 设置模板缓存
app.use(serveFavicon(path.join(__dirname, '/public/favicon.ico'))); // 设置浏览器图标
app.use(bodyParser.json({limit: '50mb'})); // 设置body结构体最大值
app.use(bodyParser.urlencoded({extended: true})); // 设置body结构体键值数据类型
app.use(express.static(path.join(__dirname, 'public'))); // 设置静态资源解析地址
// 配置session
app.use(session({
    store: new RedisStore(config.redis)
    , resave: false
    , saveUninitialized: true
    , secret: config.redis.secret
    , key: config.redis.key // key不同，基于redis的session不会出现多系统冲突
    , cookie: {
        path: '/admin' // 限定cookie的路径
    }
}));

// 加载路由
app.use('/', require('./routes'));

// 启动app监听
app.listen(config.port, ()=> {
    GLO.log(
        GLO.SYS_NAME + ' >> Http服务监听启动'
        + '  当前环境:' + GLO.ENV
        + '  监听端口:' + config.port
        , 'start');
    // todo 开启定时任务
});

// 捕获未被catch的promise异常
process.on('unhandledRejection', (err, p)=> {
    GLO.log('捕获到未被catch的Promise异常');
    GLO.error(err);
    GLO.error(p);
});
// 捕获未被catch的异常
process.on('uncaughtException', err=> {
    GLO.error(err);
});
