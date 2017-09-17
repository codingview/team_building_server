/**
 * Created by zhangrz on 9月17.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

'use strict';

/* 产品管理 */

const Production = require('../../models').production
    , _Production = require('../../dao').production;

module.exports = {
    // 产品列表
    list: ()=> {

    }

    // 新增产品
    , create: production=> new Promise((resolve, reject)=>
            Production
                .create(new _Production().form2Db(production))
                .then(r=>resolve(r))
                .catch(e=>reject(e))
    )
};
