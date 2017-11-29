/**
 * Created by zhangrz on 2017/11/19.
 * Copyright© 2015-2020 DiandaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

'use strict';

// 路由 - 新闻模块
const express = require('express')
    , router = new express.Router()
    , Joi = require('joi')
    , newsService = require('../../../service/news')
    ;

// 新闻列表 - 页面
router.get('/list', (req, res)=>
    res.render('./admin/news/list/view', {
        title: '新闻列表'
    })
);

// 新闻列表 - 接口
router.post('/list', (req, res)=> {
    const body = req.body;
    let _ = {
        offset: 'start' in body ? parseInt(body.start) : 0
        , limit: 'length' in body ? parseInt(body.length) : 10
    };
    newsService.list(_)
        .then(r=>res.json({
            draw: 'draw' in body ? parseInt(body.draw) : 1
            , data: r.data
            , recordsTotal: r.count
            , recordsFiltered: r.count
        }))
        .catch(e=> res.json({
                draw: 'draw' in body ? parseInt(body.draw) : -1
                , data: []
                , recordsTotal: 0
                , recordsFiltered: 0
                , message: GLO.eLog(e, '读取新闻列表出错', -99)
            })
        );
});

// 新增 - 新闻
router.post('/', (req, res)=> {
    Joi.validate(req.body
        , Joi.object().keys({
            name: Joi.string().required()
            , example_id: Joi.number().integer().required()
            , sequence: Joi.number().integer().default(99)
        })
    )
        .then(newsService.add)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '新增新闻出错')));
});

// 删除 - 新闻
router.delete('/:id', (req, res)=> {
    Joi.validate(req.params.id, Joi.number().integer().required())
        .then(newsService.del)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '删除新闻出错')));
});

module.exports = router;
