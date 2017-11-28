/**
 * Created by zhangrz on 2017/11/19.
 * Copyright© 2015-2020 DiandaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

'use strict';

// 路由 - 服务案例
const express = require('express')
    , router = new express.Router()
    , exampleService = require('../../../service/example');

// 服务案例 - 分类列表 - 页面
router.get('/catalog', (req, res)=>
    res.render('./admin/catalog/view', {
        title: '案例分类'
        , type: 1
    })
);

// 服务案例 - 案例列表 - 页面
router.get('/list', (req, res)=>
    res.render('./admin/example/list/view', {
        title: '案例列表'
    })
);

// 服务案例 - 案例列表 - 接口
router.post('/list', (req, res)=> {
    const body = req.body;
    let _ = {
        offset: 'start' in body ? parseInt(body.start) : 0
        , limit: 'length' in body ? parseInt(body.length) : 10
        , state: 'state' in body ? parseInt(body.state) : 1
        , catalog_id: 'catalog_id' in body ? parseInt(body.catalog_id) : -1
    };
    exampleService.list(_)
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
                , message: GLO.eLog(e, '读取案例列表出错', -99)
            })
        );
});

// 服务案例 - 新增案例 - 页面
router.get('/add', (req, res)=>
    res.render('./admin/example/add/view', {
        title: '案例体系-新增案例'
        , detail: false
    })
);

// 服务案例 - 接口
router.put('/add', (req, res)=>
    exampleService.create(req.body)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '新增产品出错')))
);

// 更新图片 - 接口
router.put('/image', (req, res)=>
    exampleService.image(req, res)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '上传产品图片出错')))
);

// 服务案例 - 删除案例

// 服务案例 - 更新案例

module.exports = router;
