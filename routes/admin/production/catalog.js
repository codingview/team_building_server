/**
 * Created by zhangrz on 2017/11/30.
 * Copyright© 2015-2020 DiandaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router()
    , Joi = require('joi')
    , catalogService = require('../../../service/production').catalog;

// 产品 - 分类列表 - 页面
router.get('/', (req, res)=>
    res.render('./admin/production/catalog/view', {
        title: '产品体系-分类管理'
    })
);

// —————————— 产品分类 ——————————

// 获取 - 产品分类 - 列表
router.get('/list', (req, res)=>
    catalogService.catalog.list()
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '获取产品分类列表出错')))
);

// —————————— 一级产品分类 ——————————————————

// 新增 - 一级产品分类 - 接口
router.post('/first', (req, res)=>
    Joi.validate(req.body, Joi.object().keys({
        name: Joi.string().required()
        , sequence: Joi.number().integer().default(99)
        , home_show: Joi.boolean().default(false)
    }))
        .then(catalogService.first.add)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '新增产品分类出错')))
);

// 删除 - 一级产品分类 - 接口
router.delete('/first/:pcf_id', (req, res)=>
    Joi.validate(req.params.pcf_id
        , Joi.number().integer().required()
    )
        .then(catalogService.first.del)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '删除产品分类出错')))
);

// 查询 - 一级产品分类 - 接口
router.post('/first/list', (req, res)=>
    catalogService.first.query()
        .then(r=>res.json({
            data: r
            , draw: req.body.draw
            , recordsFiltered: r.length
            , recordsTotal: r.length
        }))
        .catch(e=>res.json(GLO.error(e, -99, '查询产品分类出错')))
);

// 修改 - 一级产品分类 - 接口
router.put('/first', (req, res)=>
    Joi.validate(req.body
        , Joi.object().keys({
            id: Joi.number().integer().required()
            , name: Joi.string()
            , sequence: Joi.number().integer()
            , home_show: Joi.boolean()
        }).or('name', 'sequence', 'home_show')
    )
        .then(catalogService.first.up)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '修改产品分类出错')))
);

// —————————— 二级产品分类 ——————————————————

// 新增 - 二级产品分类 - 接口
router.post('/second', (req, res)=>
    Joi.validate(req.body
        , Joi.object().keys({
            first_catalog_id: Joi.number().integer().required()
            , name: Joi.string().required()
            , sequence: Joi.number().integer().default(99)
            , home_show: Joi.boolean().default(false)
        })
    )
        .then(catalogService.second.add)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '新增产品分类出错')))
);

// 删除 - 二级产品分类 - 接口
router.delete('/second/:pcs_id', (req, res)=>
    Joi.validate(req.params.pcs_id
        , Joi.number().integer().required()
    )
        .then(catalogService.second.del)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '删除产品分类出错')))
);

// 查询 - 二级产品分类 - 接口
router.post('/second/list', (req, res)=>
    catalogService.second.query()
        .then(r=>res.json({
            data: r
            , draw: req.body.draw
            , recordsFiltered: r.length
            , recordsTotal: r.length
        }))
        .catch(e=>res.json(GLO.error(e, -99, '查询产品分类出错')))
);

// 修改 - 二级产品分类 - 接口
router.put('/second', (req, res)=>
    Joi.validate(req.body
        , Joi.object().keys({
            id: Joi.number().integer().required()
            , first_catalog_id: Joi.number().integer()
            , name: Joi.string()
            , sequence: Joi.number().integer()
            , home_show: Joi.boolean()
        }).or('name', 'sequence', 'home_show', 'first_catalog_id')
    )
        .then(catalogService.second.up)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '修改产品分类出错')))
);

module.exports = router;
