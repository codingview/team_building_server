/**
 * Created by zhangrz on 2017/11/19.
 * Copyright© 2015-2020 CodingView (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

// 通用分类

const GeneralCatalogs = require('../../models').general_catalog
    , catalogService = {
    // 新增 - 分类
    add: catalog=>GeneralCatalogs.create(catalog)

    // 删除 - 分类
    , del: catalog_id=>GeneralCatalogs.destroy({where: {id: catalog_id}})

    // 获取 - 分类 - 列表
    , list: type=>new Promise((resolve, reject)=>
        GeneralCatalogs.findAll({
            where: {type: type}
            , order: ['sequence']
            , attributes: ['id', 'name', 'sequence']
        })
            .then(l=>resolve(l))
            .catch(e=>reject(e))
    )

    // 更新 - 分类
    , up: body=>new Promise((resolve, reject)=> {
        GeneralCatalogs.findOne({where: {id: body.id}})
            .then(catalog=> {
                Object.assign(catalog, body);
                return catalog.save();
            })
            .then(()=>resolve(true))
            .catch(e=>reject(e));
    })

};

module.exports = catalogService;
