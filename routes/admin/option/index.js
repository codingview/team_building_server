/**
 * Created by zhangrz on 2017/9/5.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router();

// 全局配置页面
router.get('/', (req, res)=>
    res.render('./admin/option/view', {
        title: '全局配置'
    })
);

// 管理员 - 管理
router.use('/user', require('./user'));

// 首页 - 反馈列表
router.use('/feedback', require('./feedback'));

module.exports = router;
