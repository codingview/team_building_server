/**
 * Created by zhangrz on 2017/8/25.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created 基地资源模块
 */

'use strict';

const express = require('express')
    , router = new express.Router()
    , resourceService = require('../../../service/resource')
    , catalogService = require('../../../service/catalog');

// 基地资源 - 首页 - 中转
router.get('/', (req, res)=>res.redirect('/resource/list'));

// 基地资源 - 列表 - 页面
router.get('/list', (req, res)=>
    catalogService.list(2)
        .then(catalogs=>res.render('./web/resource/list/view', {
            title: '基地资源'
            , active: 'resource'
            , catalogs: catalogs
        }))
        .catch(e=> {
            // todo 错误页面
        })
);

// 基地资源 - 详情 - 页面
router.get('/detail/:rid', (req, res)=> {
    const resource_id = parseInt(req.params.rid);
    resourceService.view(`p:${resource_id}`); // 浏览次数加1
    resourceService.detail(resource_id)
        .then(resource=>
            res.render('./web/resource/detail/view', {
                title: '产品详情'
                , detail: resource
                , active: 'resource'
            }))
        .catch(e=> {
            // todo 错误页面
        });
});

module.exports = router;
