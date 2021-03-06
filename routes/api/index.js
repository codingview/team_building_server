/**
 * Created by zhangrz on 2017/8/23.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router();

// 首页 - 接口
router.use('/home', require('./home'));

// 产品 - 接口
router.use('/production', require('./production'));

// 案例 - 接口
router.use('/example', require('./example'));

// 案例 - 接口
router.use('/resource', require('./resource'));

// 反馈 - 接口
router.use('/feedback', require('./feedback'));

module.exports = router;
