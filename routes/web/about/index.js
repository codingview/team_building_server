/**
 * Created by zhangrz on 2017/8/25.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created 关于我们
 */

'use strict';

const express = require('express')
    , router = new express.Router();

// 关于我们 - home页
router.get('/', (req, res)=>
    res.render('./web/about/view', {
        active: 'about'
        , title: '关于我们'
    })
);

module.exports = router;
