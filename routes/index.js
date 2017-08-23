/**
 * Created by zrz on 2017/8/22.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router();

// 请求日志
router.use((req, res, next)=> {
    GLO.http(req);
    next();
});

module.exports = router;
