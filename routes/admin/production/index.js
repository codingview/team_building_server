/**
 * Created by zhangrz on 2017/9/14.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router();

/* 产品体系 */

// 产品分类 - 页面
router.get('/catalog', (req, res)=>
    res.render('./admin/production/catalog/view', {
        title: '产品体系-分类管理'
    })
);

// todo 产品分类 - 接口
router.post('/catalog', (req, res)=> {

});

// todo 新增产品分类 - 接口
router.put('/catalog', (req, res)=> {

});

// 产品列表 - 页面
router.get('/list', (req, res)=>
    res.render('./admin/production/list/view', {
        title: '产品体系-产品列表'
    })
);

// todo 产品列表 - 接口
router.post('/list', (req, res)=> {

});

// 新增产品 - 页面
router.get('/add', (req, res)=>
    res.render('./admin/production/add/view', {
        title: '产品体系-新增产品'
    })
);

// todo 新增产品 - 接口
router.put('/add', (req, res)=> {

});
module.exports = router;
