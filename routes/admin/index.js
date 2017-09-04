/**
 * Created by zhangrz on 2017/8/31.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router();

// 管理端 - 首页 >> 登录
router.get('/', (req, res)=> {
    if ('session' in req && 'admin' in req.session) {
        return res.redirect('/admin/home');
    } else {
        return res.redirect('/admin/login');
    }
});

// 管理端 - 登录
router.use('/login', require('./login'));

// 管理端 - 拦截
router.use((req, res, next)=> {
    if ('session' in req && 'admin' in req.session) {
        next();
    } else {
        return res.redirect('/admin/login');
    }
});

// 首页管理
router.use('/home', require('./home'));

// todo 团建产品

// todo 基地资源

// todo 师资实力

// todo 精彩案例

module.exports = router;
