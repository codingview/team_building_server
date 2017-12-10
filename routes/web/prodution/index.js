/**
 * Created by zhangrz on 2017/8/25.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router()
    , productionService = require('../../../service/production');

// 产品 - 首页 - 中转
router.get('/', (req, res)=>res.redirect('/production/list'));

// 产品 - 列表 - 页面
router.get('/list', (req, res)=>
    productionService.catalog.catalog.list()
        .then(catalogs=>res.render('./web/production/list/view', {
            title: '产品列表'
            , active: 'production'
            , catalogs: catalogs
            // 默认加载的二级分类编号
            , default_sci: catalogs[0].second[0].id
        }))
        .catch(e=> {
            // todo 错误页面
        })
);

// 产品 - 详情 - 页面
router.get('/detail/:pid', (req, res)=> {
    const production_id = parseInt(req.params.pid);
    productionService.production.view(`p:${production_id}`); // 浏览次数加1
    productionService.production.detail(production_id)
        .then(production=>
            res.render('./web/production/detail/view', {
                title: '产品详情'
                , detail: production
                , active: 'production'
            }))
        .catch(e=> {
            // todo 错误页面
        });
});

module.exports = router;
