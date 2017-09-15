/**
 * Created by zhangrz on 2017/9/15.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const Production_Catalog = require('../../models').production_catalog
    , ProductionCatalog = require('../../dao').production_catalog
    , _ = {
    // 分类列表
    list: grade=> new Promise((resolve, reject)=>
        Production_Catalog
            .findAll({where: {grade: grade}, order: [['sequence', 'asc']]})
            .then(catalogs=> {
                let _ = [];
                catalogs.forEach(catalog=> {
                    _.push(new ProductionCatalog(catalog.id).db2Api(catalog));
                });
                resolve(_);
            })
            .catch(e=>reject(e))
    )
    // 获取obj的分类列表
    , objList: grade=>new Promise((resolve, reject)=>
        Production_Catalog
            .findAll({where: {grade: grade}, order: [['sequence', 'asc']]})
            .then(catalogs=> {
                let _ = {};
                catalogs.forEach(catalog=> {
                    _[catalog.id] = new ProductionCatalog(catalog.id).db2Api(catalog);
                });
                resolve(_);
            })
            .catch(e=>reject(e))
    )
};

// 产品分类
module.exports = {
    // 一级分类列表
    firstCatalogList: ()=>_.list(1)

    // 二级分类列表
    , secondCatalogList: ()=>_.list(2)

    // 分类列表结构
    , catalogList: ()=>new Promise((resolve, reject)=> {
        let results = [], _catalogs = {};
        _.objList(1)
            .then(catalogs=> {
                _catalogs = catalogs;
                return _.list(2);
            })
            .then(secondCatalogs=> {
                secondCatalogs.forEach(sc=> {
                    const catalog = _catalogs[sc.father_id];
                    if ('children' in catalog) {
                        catalog.children.push(sc);
                    } else {
                        catalog.children = [sc];
                    }
                });
                Object.keys(_catalogs).forEach(key=> {
                    results.push(_catalogs[key]);
                });
                resolve(results);
            })
            .catch(e=>reject(e));
    })

};
