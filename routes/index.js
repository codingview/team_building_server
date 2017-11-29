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
    // console.info(req.sessionID, !!req.session); // 打印session信息
    GLO.http(req);
    next();
});

// 响应日志
router.use(log4js.connectLogger(log4js.getLogger('http'), {
    level: 'INFO'
    , format: ':remote-addr  :method  :url  :status  :response-time' + 'ms'
}));

// 路由 - web端接口
router.use('/api', require('./api'));

// 路由 - 管理端页面
router.use('/admin', require('./admin'));

// 路由 - web端页面
router.use('/', require('./web'));

// 路由 - 404页面
router.get('/error', (req, res)=> {
    const body = req.query;
    let message = '该页面已飞向火星~~';
    if ('msg' in body) {
        message = body.msg;
    }
    res.render('./web/error', {
        message: message
        , title: '未找到该页面'
        , active: '新易途'
    });
});

// 系统错误 - 返回
router.use((err, req, res, next) => {
    // http状态值
    res.status(err.status || 500);
    if (err.status === 404) {
        return res.redirect('/error');
    } else {
        GLO.logger('router').error(err);
        if (req.method === 'get') {
            return res.redirect('/error');
        } else {
            return res.json(GLO.error(err, -99, '系统错误'));
        }
    }
});

// 所有无指向页面指向404
router.get('*', (req, res)=>res.redirect('/error'));

module.exports = router;
