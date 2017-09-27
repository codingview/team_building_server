/**
 * Created by zhangrz on 2017/9/14.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router()
    , productionService = require('../../../service/production');

/* 产品体系 */

// 产品分类 - 页面
router.get('/catalog', (req, res)=>
    res.render('./admin/production/catalog/view', {
        title: '产品体系-分类管理'
    })
);

// 新增 - 产品分类 - 接口
router.put('/catalog', (req, res)=>
    productionService.catalog.create(req.body)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '新增产品分类出错')))
);

// 删除 - 产品分类 - 接口
router.delete('/catalog', (req, res)=>
    productionService.catalog.remove(req.body.cid)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '删除产品分类出错')))
);

// 查询 - 产品分类 - 接口
router.get('/catalog/list', (req, res)=>
    productionService.catalog.catalogList()
        .then(catalogs=>res.json(GLO.success(catalogs)))
        .catch(e=>res.json(GLO.error(e, -99, '获取产品分类列表出错')))
);

// 修改 - 产品分类名称 - 接口
router.post('/catalog', (req, res)=>
    productionService.catalog.update(req.body)
        .then(()=>res.json(GLO.success(true)))
        .catch(e=>res.json(GLO.error(e, -99, '修改产品分类名称出错')))
);

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

// todo 更新产品 - 接口

// 更新图片 - 接口
router.put('/image', (req, res)=>
    productionService.production.image(req, res)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '上传产品图片出错')))
);

module.exports = router;
