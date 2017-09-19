/**
 * Created by zhangrz on 2017/9/19.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router()
    , feedbackService = require('../../../service/feedback');

// 提交反馈
router.post('/', (req, res)=> {
    const body = req.body;
    let fb = {
        state: 0
        , ip: req.__ip
        , phone: parseInt(body.phone)
        , name: body.name
        , content: body.content
    };
    feedbackService.create(fb)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '提交反馈出错')));
});

module.exports = router;
