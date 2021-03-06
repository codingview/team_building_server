/**
 * Created by zhangrz on 2017/8/31.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router()
    , adminService = require('../../../service/admin');

// 登录 - 页面
router.get('/', (req, res)=>
    res.render('./admin/login/view', {
        title: '管理员登录'
    })
);

// 登录 - 请求
router.post('/', (req, res)=> {
    let _ = {};
    const body = req.body;
    if ('user_name' in body && body.user_name) {
        _.login_name = body.user_name;
    } else {
        return res.json(GLO.error('未获取到用户名:user_name', -11));
    }
    if ('pwd' in body && body.pwd) {
        _.password = body.pwd;
    } else {
        return res.json(GLO.error('未获取到密码:pwd', -12));
    }
    adminService.login(_)
        .then(r=> {
            if (r) {
                req.session.admin = {
                    name: r.name
                };
                return res.json(GLO.success(true));
            } else {
                return res.json(GLO.error('账号和密码不匹配', -20));
            }
        })
        .catch(e=>res.json(GLO.error(e, -99, '登录发生错误')));
});

// 登录 - 退出
router.get('/off', (req, res)=> {
    req.session.destroy();
    return res.redirect('/admin');
});

module.exports = router;
