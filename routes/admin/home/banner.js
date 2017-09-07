/**
 * Created by zrz on 2017/9/8.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

// 广告位 调整

const express = require('express')
    , router = new express.Router();

// 页面
router.get('/', (req, res)=>
    res.render('./admin/home/banner/view', {
        title: '广告位调整'
    })
);

// 增加广告位 - 上传图片
// router.post()

module.exports = router;
