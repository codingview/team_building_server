/**
 * Created by zhangrz on 2017/9/15.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const Production_Catalog = require('../../models').production_catalog;


// 产品分类
module.exports = {
    // 分类列表
    list: ()=> new Promise((resolve, reject)=> {
        Production_Catalog
            .findAll()
            .then(catalogs=> {
                
            })
    })
};
