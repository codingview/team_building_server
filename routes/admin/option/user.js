/**
 * Created by zrz on 2017/9/6.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router()
    , adminService = require('../../../service/admin');

// 管理员 - 页面 - 列表
router.get('/', (req, res)=>
    res.render('./admin/option/user/view', {
        title: '管理员管理'
    })
);

// 管理员 - api - 新增
router.post('/', (req, res)=> {

});

// 管理员 - api - 删除
router.delete('/:uid', (req, res)=> {

});

// 管理员 - api - 列表
router.post('/list', (req, res)=> {
    const body = req.body;
    let _ = {
        offset: 'start' in body ? parseInt(body.start) : 0
        , limit: 'length' in body ? parseInt(body.length) : 10
    };
    adminService.query.list(_)
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
                , message: GLO.eLog(e, '读取管理员列表出错', -99)
            })
        );
});

// 管理员 - api - 更新
router.put('/uid', (req, res)=> {

});

module.exports = router;
