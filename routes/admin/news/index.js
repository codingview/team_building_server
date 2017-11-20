/**
 * Created by zhangrz on 2017/11/19.
 * Copyright© 2015-2020 DiandaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

'use strict';

// 路由 - 新闻模块
const express = require('express')
    , router = new express.Router();

// 新闻 - 列表
router.get('/list', (req, res)=>
    res.render('./admin/news/list/view', {
        title: '新闻列表'
    })
);

// 新增 - 新闻

// 删除 - 新闻

// 更新 - 新闻

module.exports = router;
