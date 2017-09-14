/**
 * Created by zhangrz on 2017/9/14.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router();

/* 产品体系 */

router.use('/catalog', require('./catalog'));

// todo 产品体系 - 新增产品

module.exports = router;
