/**
 * Created by zhangrz on 2017/8/23.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router();

// 首页
router.get('/', (req, res)=>
    res.render('./home/view.ejs', {
        title: '首页'
        , menu: require('../../../config/menu')
        , active: 'home'
    })
);

module.exports = router;
