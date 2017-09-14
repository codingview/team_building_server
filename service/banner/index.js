/**
 * Created by zhangrz on 2017/9/7.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

// 广告位

const Banner = require('../../models').banner
    , _Banner = require('../../dao').banner;

module.exports = {
    // 新增 - 广告
    add: banner=>new Promise((resolve, reject)=> {

    })

    // 删除 - 广告

    // 查询 - 广告 - 列表
    , list: ()=>new Promise((resolve, reject)=>
        Banner
            .findAll({
                order: [['sequence', 'ASC']]
            })
            .then(banners=> {
                const r = [];
                if (banners && banners instanceof Array && banners.length > 0) {
                    banners.forEach(banner=>r.push(new _Banner().db2Api(banner)));
                    return resolve(r);
                } else {
                    return reject('查询广告位失败');
                }
            })
            .catch(e=>reject(e))
    )

    // 修改 - 广告
};
