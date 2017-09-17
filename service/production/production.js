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
    list: ({offset, limit})=>new Promise((resolve, reject)=>
            Production.findAndCountAll({offset, limit})
                .then(result=> {
                    const rows = result.rows;
                    let results = [];
                    if (rows && rows instanceof Array && rows.length > 0) {
                        rows.forEach(row=> results.push(new _Production().db2Api(row.dataValues)));
                        return resolve({results: results, count: result.count});
                    } else {
                        return resolve({results: [], count: 0});
                    }
                })
                .catch(e=>reject(e))
    )

    // 新增产品
    , create: production=> new Promise((resolve, reject)=>
            Production
                .create(new _Production().form2Db(production))
                .then(r=>resolve(r))
                .catch(e=>reject(e))
    )
};
