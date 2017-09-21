/**
 * Created by zhangrz on 2017/9/14.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router()
    , bannerService = require('../../../service/banner');

// 首页 - banner
router.post('/banner', (req, res)=>
    bannerService.list()
        .then(list=>res.json(GLO.success(list)))
        .catch(e=>res.json(GLO.error(e, -99, '获取广告位数据出错')))
);

module.exports = router;
