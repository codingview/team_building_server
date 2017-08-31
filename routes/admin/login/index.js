/**
 * Created by zhangrz on 2017/8/31.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router();

// 登录 - 页面
router.get('/', (req, res)=>
    res.render('./admin/login/view', {
        title: '管理员登录'
    })
);

// 登录 - 请求
router.post('/', (req, res)=> {
   
});

module.exports = router;
