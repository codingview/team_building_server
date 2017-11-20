/**
 * Created by zhangrz on 2017/11/19.
 * Copyright© 2015-2020 DiandaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

'use strict';

// 通用分类

const GeneralCatalogs = require('../../models').general_catalog
    , catalogService = {
    // 新增 - 分类
    add: catalog=>GeneralCatalogs.create(catalog)

    // 删除 - 分类

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

};

module.exports = catalogService;
