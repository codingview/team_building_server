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

module.exports = router;
