/**
 * Created by zhangrz on 2017/9/7.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

// 广告位

const Banner = require('../../models').banner;

module.exports = {
    // 新增 - 广告
    add: ()=>new Promise((resolve, reject)=> {

    })

    // 删除 - 广告

    // 查询 - 广告 - 列表
    , list: ()=>new Promise((resolve, reject)=>
        Banner.findAll()
    )

    // 修改 - 广告
};
