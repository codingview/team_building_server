/**
 * Created by zhangrz on 2017/9/14.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router()
    , Joi = require('joi')
    , bannerService = require('../../../service/banner')
    , newsService = require('../../../service/news')
    ;

// 首页 - banner
router.post('/banner', (req, res)=>
    bannerService.list()
        .then(list=>res.json(GLO.success(list)))
        .catch(e=>res.json(GLO.error(e, -99, '获取广告位数据出错')))
);

// 首页 - 获取 - 新闻 - 列表
router.get('/news/list', (req, res)=> {
    Joi.validate(req.query
        , Joi.object().keys({
            limit: Joi.number().integer().default(6)
            , offset: Joi.number().integer().default(0)
        })
    )
        .then(newsService.homeList)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '获取新闻列表数据出错')));
});

module.exports = router;
