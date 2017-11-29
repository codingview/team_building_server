/**
 * Created by zhangrz on 2017/9/24.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router()
    , newsService = require('../../../service/news');

// 新闻 - 详情 - 页面
router.get('/detail/:nid', (req, res)=>
    newsService.detail(req.params.nid)
        .then(details=>
            res.render('./web/news/detail/view', {
                title: '新闻详情'
                , active: 'news'
                , detail: details
            })
        )
        .catch(e=> {
            res.redirect('/error?msg=未找到该新闻的详情信息');
        })
);

module.exports = router;
