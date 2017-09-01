/**
 * Created by zhangrz on 2017/8/23.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router();

// 默认 > 首页
router.get('/', (req, res)=>res.redirect('/home'));

// 首页
router.use('/home', require('./home'));

// 团建产品
router.use('/production', require('./prodution'));

// 基地资源
router.use('/resource', require('./resource'));

// 精彩案例
router.use('/case', require('./case'));

// 关于我们
router.use('/about', require('./about'));

module.exports = router;
