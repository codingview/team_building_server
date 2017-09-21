/**
 * Created by zrz on 2017/9/8.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

// 广告位 调整

const express = require('express')
    , router = new express.Router()
    , bannerService = require('../../../service/banner');

// 调整 - 广告位 - 页面
router.get('/', (req, res)=>
    res.render('./admin/home/banner/view', {
        title: '广告位调整'
    })
);

// 增加广告位 - 上传图片
// router.post()

// 删除 - 广告位
router.delete('/:bid', (req, res)=>
    bannerService.remove(req.params.bid)
        .then(()=>res.json(GLO.success(true)))
        .catch(e=>res.json(GLO.error(e, -99, '删除广告位')))
);

// 获取 - 广告位 - 列表
router.get('/list', (req, res)=>
    bannerService.list()
        .then(list=>res.json(GLO.success(list)))
        .catch(e=>res.json(GLO.error(e, -99, '获取广告位列表出错')))
);

module.exports = router;
