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

// 案例列表 - 页面
router.get('/list', (req, res)=>
    res.render('./admin/example/list/view', {
        title: '案例列表'
    })
);

// 案例列表 - 接口
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

// 新增案例 - 页面
router.get('/add', (req, res)=>
    res.render('./admin/example/add/view', {
        title: '案例体系-新增案例'
        , detail: false
    })
);

// 新增案例 - 接口
router.put('/add', (req, res)=>
    exampleService.create(req.body)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '新增案例出错')))
);

// 上传图片 - 接口
router.put('/image', (req, res)=>
    exampleService.image(req, res)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '上传案例图片出错')))
);

// 更新案例 - 页面
router.get('/update/:pid', (req, res)=>
    exampleService.detail(req.params.pid)
        .then(p=>res.render('./admin/example/update/view', {
            title: '案例体系-更新案例'
            , detail: p
        }))
        .catch(e=> {
            // todo 错误页面
        })
);

// 更新案例 - 接口
router.put('/update', (req, res)=>
    exampleService.update(req.body)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '更新案例出错')))
);

// 服务案例 - 上/下架案例
router.post('/state/:eid/:state', (req, res)=> {
    const state = parseInt(req.params.state)
        , example_id = parseInt(req.params.eid);
    if (state === 1 || state === 0) {
        exampleService.state(example_id, state)
            .then(()=>res.json(GLO.success(true)))
            .catch(e=>res.json(GLO.error(e, -99, '上下架案例出错')));
    } else {
        return res.json(GLO.error('上下架标记错误:state', -11));
    }
});

module.exports = router;
