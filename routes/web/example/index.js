/**
 * Created by zhangrz on 2017/8/25.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created 服务案例模块
 */

'use strict';

const express = require('express')
    , router = new express.Router();

// 服务案例 - 首页 - 中转
router.get('/', (req, res)=>res.redirect('/example/list'));

// 服务案例 - 列表 - 页面
router.get('/list', (req, res)=>
    res.render('./web/example/list/view', {
        title: '服务案例'
        , active: 'example'
    })
);

// 服务案例 - 详情 - 页面
router.get('/detail/:rid', (req, res)=>
    res.render('./web/example/detail/view', {
        title: '服务案例详情'
        , active: 'example'
    })
);

module.exports = router;
