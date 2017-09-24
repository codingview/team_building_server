/**
 * Created by zhangrz on 2017/8/25.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created 服务案例模块
 */

'use strict';

const express = require('express')
    , router = new express.Router();

// 服务案例 - 首页 - 中转
router.get('/', (req, res)=>res.redirect('/case/list'));

// 服务案例 - 列表 - 页面
router.get('/list', (req, res)=>
    res.render('./web/case/list/view', {
        title: '服务案例'
        , active: 'case'
    })
);

// 服务案例 - 详情 - 页面
router.get('/detail/:rid', (req, res)=>
    res.render('./web/case/detail/view', {
        title: '服务案例详情'
        , active: 'case'
    })
);

module.exports = router;
