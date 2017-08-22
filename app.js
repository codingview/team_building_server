/**
 * Created by zrz on 2017/8/22.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

global.GLO = require('./utils/global');

// 加载modules
const express = require('express')
    , app = express()// 创建项目实例
    , bodyParser = require('body-parser')
    , path = require('path')
    , serveFavicon = require('serve-favicon')
    , cookieParser = require('cookie-parser')
    , config = require('./config')
    ;

require('events').EventEmitter.defaultMaxListeners = 0;

app.set('views', path.join(__dirname, '/views')); // 设置模板地址
app.set('view engine', 'ejs'); // 设置模板引擎
app.set('view cache', !GLO.isDev()); // 设置模板缓存
app.use(serveFavicon(path.join(__dirname, '/public/favicon.ico'))); // 设置浏览器图标
app.use(bodyParser.json({limit: '50mb'})); // 设置body结构体最大值
app.use(bodyParser.urlencoded({extended: true})); // 设置body结构体键值数据类型
app.use(cookieParser()); // 加载cookie解析中间件
app.use(express.static(path.join(__dirname, 'public'))); // 设置静态资源解析地址

// 加载路由
app.use('/', require('./routes'));

// 启动app监听
app.listen(config.port, ()=> {
    GLO.log(
        GLO.SYS_NAME + ' >> Http服务监听启动'
        + '  当前环境:' + GLO.ENV
        + '  监听端口:' + config.port
    );
});
