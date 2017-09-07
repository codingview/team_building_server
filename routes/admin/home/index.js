/**
 * Created by zhangrz on 2017/8/31.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router();

// 首页管理 - 首页 >> banner调整
router.get('/', (req, res)=>res.redirect('/admin/home/banner'));

// 首页 - banner调整
router.use('/banner', require('./banner'));

module.exports = router;
