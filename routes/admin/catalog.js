/**
 * Created by zhangrz on 2017/11/19.
 * Copyright© 2015-2020 DiandaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

'use strict';

// 路由 - 通用分类
const express = require('express')
    , router = new express.Router()
    , Joi = require('joi')
    , catalogService = require('../../service/catalog');

// 分类列表
router.post('/list', (req, res)=> {
    const body = req.query;
    if ('type' in body) {
        const type = parseInt(body.type);
        if (type === 1 || type === 2) {
            catalogService.list(type)
                .then(cl=>res.json(GLO.dt(req.body.draw, cl)))
                .catch(e=> {
                    GLO.error(e, -99, '获取分类列表出错');
                    res.json(GLO.dt(req.body.draw, [], 0));
                });
        } else {
            return res.json(GLO.error('分类类型错误', -25));
        }
    } else {
        return res.json(GLO.error('未读取到分类类型', -21));
    }
});

// 新增分类
router.post('/', (req, res)=>
    joi.validate(req.body, {
        name: Joi.string().required()
        , type: Joi.number().integer().required()
        , icon: Joi.string()
    })
        .then(catalogService.add)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '新增分类出错')))
);

// 删除分类
router.delete('/:cid', (req, res)=>
    catalogService.del(req.params.cid)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e)))
);

// 更新分类
router.post('/', (req, res)=>
    joi.validate(req.body
        , Joi.object().keys({
            id: Joi.number().integer().required()
            , name: Joi.string()
            , type: Joi.number().integer()
            , icon: Joi.string()
        }).with('name', 'type', 'icon')
    )
        .then(catalogService.add)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '新增分类出错')))
);

module.exports = router;