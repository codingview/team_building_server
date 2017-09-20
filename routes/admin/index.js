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
        return res.redirect('/admin/option');
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

// 全局管理
router.use('/option', require('./option'));

// 首页管理
router.use('/home', require('./home'));

// 团建产品
router.use('/production', require('./production'));

// todo 基地资源

// todo 师资实力

// 关于我们
router.get('/about', (req, res)=>
    res.render('./admin/about/view', {
        title: '设置关于我们'
        , menu: require('../../config/about_menu')
    })
);

module.exports = router;
