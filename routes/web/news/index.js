/**
 * Created by zhangrz on 2017/9/24.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router();

// 新闻 - 详情 - 页面
router.get('/detail/:nid', (req, res)=>
    res.render('./web/news/detail/view', {
        title: '新闻详情'
        , active: 'news'
    })
);

module.exports = router;
