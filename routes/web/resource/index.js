/**
 * Created by zhangrz on 2017/8/25.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created 基地资源模块
 */

'use strict';

const express = require('express')
    , router = new express.Router();

// 基地资源 - 首页 - 中转
router.get('/', (req, res)=>res.redirect('/resource/list'));

// 基地资源 - 列表 - 页面
router.get('/list', (req, res)=>
    res.render('./resource/list/view', {
        title: '基地资源'
        , active: 'resource'
    })
);

// 基地资源 - 详情 - 页面
router.get('/detail/:rid', (req, res)=>
    res.render('./resource/detail/view', {
        title: '基地资源详情'
        , active: 'resource'
    })
);

module.exports = router;
