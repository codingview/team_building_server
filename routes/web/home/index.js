/**
 * Created by zhangrz on 2017/8/23.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router()
    , bannerService = require('../../../service/banner')
    , catalogService = require('../../../service/production').catalog;

// 首页
router.get('/', (req, res)=> {
    let json = {
        title: '首页'
        , menu: require('../../../config/menu')
        , active: 'home'
        , banners: []
        , catalogs: []
    };
    bannerService.list()
        .then(list=> {
            json.banners = list;
            return catalogService.homeCatalogsList();
        })
        .then(catalogs=> {
            json.catalogs = catalogs;
            return res.render('./web/home/view.ejs', json);
        })
        .catch(e=>res.render('./web/home/view.ejs', json));
});

module.exports = router;
