/**
 * Created by zhangrz on 2017/9/18.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

/* 在线反馈 */

const Feedback = require('../../models').feedback
    , _Feedback = require('../../dao').feedback;

module.exports = {
    // 新增 - 反馈
    create: fb=>new Promise((resolve, reject)=>
        Feedback.create(fb)
            .then(r=>resolve(r))
            .catch(e=>reject(e))
    )

    // 已查看 - 反馈
    , view: fid=>new Promise((resolve, reject)=>
        Feedback.update({state: 0}, {where: {id: fid}})
    )

    // 查询 - 反馈 - 列表
    , list: ({offset, limit})=>new Promise((resolve, reject)=>
        Feedback.findAndCountAll({offset, limit})
            .then(result=> {
                const rows = result.rows;
                let results = [];
                if (rows && rows instanceof Array && rows.length > 0) {
                    rows.forEach(row=> results.push(new _Feedback().db2Api(row.dataValues)));
                    return resolve({results: results, count: result.count});
                } else {
                    return resolve({results: [], count: 0});
                }
            })
            .catch(e=>reject(e))
    )
};

