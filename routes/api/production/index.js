/**
 * Created by zhangrz on 9月17.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router()
    , productionService = require('../../../service/production');

// 根据分类获取商品
router.post('/list', (req, res)=> {
    const body = req.body;
    let _ = {
        offset: 'offset' in body ? parseInt(body.offset) : 0
        , limit: 'limit' in body ? parseInt(body.limit) : 20
    };
    if ('sci' in body) {
        const sci = parseInt(body.sci);
        if (sci !== -1) {
            _.second_catalog_id = sci;
        }
        productionService.production.listBySci(_)
            .then(data=>res.json(GLO.success(data.data, data.count)))
            .catch(e=>res.json(GLO.error(e, -99, '根据分类获取商品出错')));
    } else {
        return res.json(GLO.error('未获取到分类编号:sci', -11));
    }
});

module.exports = router;
