/**
 * Created by zhangrz on 2017/11/19.
 * Copyright© 2015-2020 DiandaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

'use strict';

// 路由 - 服务案例
const express = require('express')
    , router = new express.Router();

// 服务案例 - 分类列表
router.get('/catalog', (req, res)=>
    res.render('./admin/catalog/view', {
        title: '案例分类'
        , type: 1
    })
);

// 服务案例 - 案例列表
router.get('/list', (req, res)=>
    res.render('./admin/case/list/view', {
        title: '案例列表'
    })
);

// 服务案例 - 新增案例
router.get('/add', (req, res)=>
    res.render('./admin/case/add/view', {
        title: '新增案例'
    })
);

// 服务案例 - 删除案例

// 服务案例 - 更新案例

module.exports = router;
