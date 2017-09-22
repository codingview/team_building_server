/**
 * Created by zhangrz on 2017/9/7.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

// 广告位

const Banner = require('../../models').banner
    , _Banner = require('../../dao').banner
// 对图片的处理
    , imageUtil = require('./image')
    ;

module.exports = {
    // 新增 - 广告
    add: banner=>new Promise((resolve, reject)=> {

    })

    // 删除 - 广告
    , remove: bid=>Banner.destroy({where: {id: bid}})

    // 查询 - 广告 - 列表
    , list: ()=>new Promise((resolve, reject)=>
        Banner.findAll({order: [['sequence', 'ASC']]})
            .then(banners=> {
                const r = [];
                if (banners && banners instanceof Array && banners.length > 0) {
                    banners.forEach(banner=>r.push(new _Banner().db2Api(banner)));
                    return resolve(r);
                } else {
                    return resolve([]);
                }
            })
            .catch(e=>reject(e))
    )

    // 修改 - 广告
    , update: (req, res)=>imageUtil(req, res)

};
