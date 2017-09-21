/**
 * Created by zhangrz on 2017/9/21.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router()
    , aboutService = require('../../service/about');

// 设置关于我们 - 页面
router.get('/', (req, res)=>
    res.render('./admin/about/view', {
        title: '设置关于我们'
        , menu: require('../../config/about_menu')
    })
);

// 设置关于我们 - 保存
router.post('/s/:active', (req, res)=>
    aboutService.save(req.params.active, req.body.rt)
        .then(()=>res.json(GLO.success(true)))
        .catch(e=>res.json(GLO.error(e, -99, '保存出错')))
);

// 设置关于我们 - 读取
router.get('/s/:active', (req, res)=>
    aboutService.read(req.params.active)
        .then(rich_text=>res.json(GLO.success(rich_text)))
        .catch(e=>res.json(GLO.error(e, -99, '读取出错')))
);

module.exports = router;
