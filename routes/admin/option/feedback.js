/**
 * Created by zhangrz on 2017/9/19.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created 反馈
 */

'use strict';

const express = require('express')
    , router = new express.Router()
    , feedbackService = require('../../../service/feedback');

// 反馈 - home页
router.get('/', (req, res)=>res.redirect('/admin/option/feedback/list'));

// 反馈 - 列表 - 页面
router.get('/list', (req, res)=>
    res.render('./admin/option/feedback/view', {
        title: '反馈'
    })
);

// 反馈 - 列表
router.post('/list', (req, res)=> {
    const body = req.body;
    let _ = {
        offset: 'start' in body ? parseInt(body.start) : 0
        , limit: 'length' in body ? parseInt(body.length) : 10
    };
    feedbackService.list(_)
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

// 反馈 - 已读

module.exports = router;
