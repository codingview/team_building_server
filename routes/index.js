/**
 * Created by zrz on 2017/8/22.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router()
    , log4js = GLO.log4js;

// 请求日志
router.use((req, res, next)=> {
    console.info(req.sessionID, !!req.session);
    GLO.http(req);
    next();
});

// 响应日志
router.use(log4js.connectLogger(log4js.getLogger('http'), {
    level: 'INFO'
    , format: ':remote-addr  :method  :url  :status  :response-time' + 'ms'
}));

// todo 路由 - web端接口
router.use('/api', require('./api'));

// todo 路由 - 管理端页面
router.use('/admin', require('./admin'));

// todo 路由 - web端页面
router.use('/', require('./web'));

// todo 路由 - 404页面

// 系统错误 - 返回
router.use((err, req, res, next) => {
    // http状态值
    res.status(err.status || 500);
    if (err.status !== 404) {
        GLO.logger('router').error(err);
        return res.json(GLO.error(err, -99, '系统错误'));
    } else {
        return res.json(GLO.error(err, 404, '未找到请求地址'));
    }
});

module.exports = router;
