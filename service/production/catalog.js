/**
 * Created by zhangrz on 2017/9/15.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const ProductionCatalogFirst = require('../../models').production_catalog_first
    , ProductionCatalogSecond = require('../../models').production_catalog_second
    , firstCatalogService = { // 一级产品分类
    // 新增 - 一级产品分类
    add: body=>ProductionCatalogFirst.create(body)

    // 删除 - 一级产品分类
    , del: pcf_id=>new Promise((resolve, reject)=> {
        ProductionCatalogFirst.findOne({where: {id: pcf_id}})
            .then(first=> {
                if (first) {
                    return first.destroy();
                } else {
                    reject('未找到对应的一级产品分类');
                }
            })
            .then(resolve)
            .catch(reject);
    })

    // 查询 - 一级产品分类
    , query: body=>ProductionCatalogFirst.findAll({order: [['sequence', 'desc']]})

    // 修改 - 一级产品分类
    , up: body=>new Promise((resolve, reject)=> {
        ProductionCatalogFirst.findOne({where: {id: body.id}})
            .then(first=> {
                if (first) {
                    Object.assign(first, body);
                    return first.save();
                } else {
                    reject('未找到对应的一级产品分类');
                }
            })
            .then(resolve)
            .catch(reject);
    })
}, secondCatalogService = { // 二级产品分类
    // 新增 - 二级产品分类
    add: body=>ProductionCatalogSecond.create(body)

    // 删除 - 二级产品分类
    , del: pcf_id=>new Promise((resolve, reject)=> {
        ProductionCatalogSecond.findOne({where: {id: pcf_id}})
            .then(second=> {
                if (second) {
                    return second.destroy();
                } else {
                    reject('未找到对应的二级产品分类');
                }
            })
            .then(resolve)
            .catch(reject);
    })

    // 查询 - 二级产品分类
    , query: body=>ProductionCatalogSecond.findAll({order: [['sequence', 'desc']]})

    // 修改 - 二级产品分类
    , up: body=>new Promise((resolve, reject)=> {
        ProductionCatalogSecond.findOne({where: {id: body.id}})
            .then(second=> {
                if (second) {
                    Object.assign(second, body);
                    return second.save();
                } else {
                    reject('未找到对应的二级产品分类');
                }
            })
            .then(resolve)
            .catch(reject);
    })
}, homeCatalogService = { // 首页分类

};

// 产品分类
module.exports = {
    first: firstCatalogService
    , second: secondCatalogService
    , home: homeCatalogService
};
