/**
 * Created by zrz on 2017/9/4.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const Admin = require('../../models').admin
    , _Admin = require('../../dao/admin');

// 查询 - 管理员
module.exports = {
    // 查询 - 分页列表和记录条数
    list: ({offset, limit})=>new Promise((resolve, reject)=>
        Admin.findAndCountAll({offset, limit})
            .then(result=> {
                const rows = result.rows;
                let results = [];
                if (rows && rows instanceof Array && rows.length > 0) {
                    rows.forEach(row=> results.push(new _Admin().db2Api(row.dataValues)));
                    return resolve({results: results, count: result.count});
                } else {
                    return resolve({results: [], count: 0});
                }
            })
            .catch(e=>reject(e))
    )
};
