/**
 * Created by zhangrz on 2017/9/14.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router()
    , productionService = require('../../../service/production');

// 产品分类
router.use('/catalog', require('./catalog'));

/* 产品体系 */

// 产品列表 - 页面
router.get('/list', (req, res)=>
    res.render('./admin/production/list/view', {
        title: '产品体系-产品列表'
    })
);

// 产品列表 - 接口
router.post('/list', (req, res)=> {
    const body = req.body;
    let _ = {
        offset: 'start' in body ? parseInt(body.start) : 0
        , limit: 'length' in body ? parseInt(body.length) : 10
        , state: 'state' in body ? parseInt(body.state) : 1
        , catalog_id: 'catalog_id' in body ? parseInt(body.catalog_id) : -1
    };
    productionService.production.list(_)
        .then(r=>res.json({
            draw: 'draw' in body ? parseInt(body.draw) : 1
            , data: r.results
            , recordsTotal: r.count
            , recordsFiltered: r.count
        }))
        .catch(e=> res.json({
                draw: 'draw' in body ? parseInt(body.draw) : -1
                , data: []
                , recordsTotal: 0
                , recordsFiltered: 0
                , message: GLO.eLog(e, '读取产品列表出错', -99)
            })
        );
});

// 新增产品 - 页面
router.get('/add', (req, res)=>
    res.render('./admin/production/add/view', {
        title: '产品体系-新增产品'
        , detail: false
    })
);

// 新增产品 - 接口
router.put('/add', (req, res)=>
    productionService.production.create(req.body)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '新增产品出错')))
);

// 上传图片 - 接口
router.put('/image', (req, res)=>
    productionService.production.image(req, res)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '上传产品图片出错')))
);

// 更新产品 - 页面
router.get('/update/:pid', (req, res)=>
    productionService.production.detail(req.params.pid)
        .then(p=>res.render('./admin/production/update/view', {
            title: '产品体系-更新产品'
            , detail: p
        }))
        .catch(e=> {
            // todo 错误页面
        })
);

// 更新产品 - 接口
router.put('/update', (req, res)=>
    productionService.production.update(req.body)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '更新产品出错')))
);

// 上/下架
router.post('/state/:pid/:state', (req, res)=> {
        const state = parseInt(req.params.state)
            , production_id = parseInt(req.params.pid);
        if (state === 1 || state === 0) {
            productionService.production.state(production_id, state)
                .then(()=>res.json(GLO.success(true)))
                .catch(e=>res.json(GLO.error(e, -99, '上下架产品出错')));
        } else {
            return res.json(GLO.error('上下架标记错误:state', -11));
        }
    }
);

module.exports = router;
