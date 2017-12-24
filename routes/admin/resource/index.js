/**
 * Created by zhangrz on 2017/12/21.
 * Copyright© 2015-2020 CodingView (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

// 路由 - 基地资源
const express = require('express')
    , router = new express.Router()
    , resourceService = require('../../../service/resource');

// 基地资源 - 分类列表 - 页面
router.get('/catalog', (req, res)=>
    res.render('./admin/catalog/view', {
        title: '基地分类'
        , type: 2
    })
);

// 基地列表 - 页面
router.get('/list', (req, res)=>
    res.render('./admin/resource/list/view', {
        title: '基地列表'
    })
);

// 基地列表 - 接口
router.post('/list', (req, res)=> {
    const body = req.body;
    let _ = {
        offset: 'start' in body ? parseInt(body.start) : 0
        , limit: 'length' in body ? parseInt(body.length) : 10
        , state: 'state' in body ? parseInt(body.state) : 1
        , catalog_id: 'catalog_id' in body ? parseInt(body.catalog_id) : -1
    };
    resourceService.list(_)
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
                , message: GLO.eLog(e, '读取基地列表出错', -99)
            })
        );
});

// 新增基地 - 页面
router.get('/add', (req, res)=>
    res.render('./admin/resource/add/view', {
        title: '基地体系-新增基地'
        , detail: false
    })
);

// 新增基地 - 接口
router.put('/add', (req, res)=>
    resourceService.create(req.body)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '新增基地出错')))
);

// 上传图片 - 接口
router.put('/image', (req, res)=>
    resourceService.image(req, res)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '上传基地图片出错')))
);

// 更新基地 - 页面
router.get('/update/:pid', (req, res)=>
    resourceService.detail(req.params.pid)
        .then(p=>res.render('./admin/resource/update/view', {
            title: '基地体系-更新基地'
            , detail: p
        }))
        .catch(e=> {
            // todo 错误页面
        })
);

// 更新基地 - 接口
router.put('/update', (req, res)=>
    resourceService.update(req.body)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '更新基地出错')))
);

// 基地资源 - 上/下架基地
router.post('/state/:eid/:state', (req, res)=> {
    const state = parseInt(req.params.state)
        , resource_id = parseInt(req.params.eid);
    if (state === 1 || state === 0) {
        resourceService.state(resource_id, state)
            .then(()=>res.json(GLO.success(true)))
            .catch(e=>res.json(GLO.error(e, -99, '上下架基地出错')));
    } else {
        return res.json(GLO.error('上下架标记错误:state', -11));
    }
});

module.exports = router;
