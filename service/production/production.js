/**
 * Created by zhangrz on 9月17.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

'use strict';

/* 产品管理 */

const Production = require('../../models').production
    , _Production = require('../../dao').production
    , _image = require('./image');

module.exports = {
    // 新增产品
    create: production=> new Promise((resolve, reject)=>
        Production
            .create(new _Production().form2Db(production))
            .then(r=>resolve(r))
            .catch(e=>reject(e))
    )
    // 产品列表
    , list: ({offset, limit})=>new Promise((resolve, reject)=>
        Production.findAndCountAll({offset, limit})
            .then(result=> {
                const rows = result.rows;
                let results = [];
                if (rows && rows instanceof Array && rows.length > 0) {
                    rows.forEach(row=> results.push(new _Production(row.id).db2Api(row.dataValues)));
                    return resolve({results: results, count: result.count});
                } else {
                    return resolve({results: [], count: 0});
                }
            })
            .catch(e=>reject(e))
    )

    // 根据分类编号获取商品列表
    , listByCid: params=>new Promise((resolve, reject)=>
        Production
            .findAndCountAll({where: {catalog_id: params.catalog_id}, offset: params.offset, limit: params.limit})
            .then(result=> {
                const rows = result.rows;
                let results = [];
                if (rows && rows instanceof Array && rows.length > 0) {
                    rows.forEach(row=> results.push(new _Production(row.id).db2Icon(row.dataValues)));
                    return resolve({results: results, count: result.count});
                } else {
                    return resolve({results: [], count: 0});
                }
            })
            .catch(e=>reject(e))
    )

    // 产品详情
    , detail: production_id=>new Promise((resolve, reject)=>
        Production
            .find({where: {id: production_id}})
            .then(p=>resolve(new _Production(p.id).db2Detail(p.dataValues)))
            .catch(e=>reject(e))
    )

    // 上传 - 产品 - 图片
    , image: (req, res)=>new Promise((resolve, reject)=>
        _image.save(req, res)
            .then(body=> {
                _image.transform(body);
                resolve(body);
            })
            .catch(e=>reject(e))
    )
};
