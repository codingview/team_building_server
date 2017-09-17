/**
 * Created by zhangrz on 9月17.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router()
    , productionService = require('../../../service/production');

// 获取分类列表
router.get('/catalog', (req, res)=> {

});

// 根据分类获取商品
router.post('/list', (req, res)=> {
    const body = req.body;
    let _ = {
        offset: 'offset' in body ? body.offset : 0
        , limit: 'length' in body ? body.length : 10
    };
    if ('cid' in body) {
        _.catalog_id = parseInt(body.cid);
        productionService.production.listByCid(_)
            .then(data=>res.json(GLO.success(data.results, data.count)))
            .catch(e=>res.json(GLO.error(e, -99, '根据分类获取商品出错')));
    } else {
        return res.json(GLO.error('未获取到分类编号:cid', -11));
    }
});

module.exports = router;
