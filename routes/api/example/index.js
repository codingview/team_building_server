/**
 * Created by zhangrz on 2017/12/13.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

const express = require('express')
    , router = new express.Router()
    , exampleService = require('../../../service/example');

// 根据分类获取服务案例
router.post('/list', (req, res)=> {
    const body = req.body;
    let _ = {
        offset: 'offset' in body ? parseInt(body.offset) : 0
        , limit: 'limit' in body ? parseInt(body.limit) : 20
    };
    if ('cid' in body) {
        const cid = parseInt(body.cid);
        if (cid !== -1) {
            _.catalog_id = cid;
        }
        exampleService.listByCid(_)
            .then(data=>res.json(GLO.success(data.data, data.count)))
            .catch(e=>res.json(GLO.error(e, -99, '根据分类获取案例出错')));
    } else {
        return res.json(GLO.error('未获取到案例编号:cid', -11));
    }
});

module.exports = router;
