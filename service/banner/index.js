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
    add: (req, res)=>new Promise((resolve, reject)=> {
            req.params.bid = -1;
            imageUtil.save(req, res) // 保存临时图片
                .then(body=> {
                    const b = new _Banner().api2Db(body);
                    b.image = ''; // 使用空的图片
                    return Banner.create(b); // 创建banner记录
                })
                .then(result=> {
                    const _bid = result.id
                        , body = imageUtil.transform({bid: -1, _bid: _bid, img: ''}); // 转换并生成对应的图片
                    imageUtil.removeTempImage({bid: -1}); // 删除临时文件
                    return Banner.update({image: body.img}, {where: {id: _bid}}); // 更新db中记录
                })
                .catch(e=>reject(e));
        }
    )

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
    , update: (req, res)=>new Promise((resolve, reject)=>
        imageUtil.save(req, res)
            .then(body=> {
                if (body.imgBoo) { // 判断是否更新了图片，有图片才进行转换和删除临时图片
                    imageUtil.transform(body);
                    imageUtil.removeTempImage(body);
                }
                const b = new _Banner().api2Db(body);
                return Banner.update(b, {where: {id: body.bid}});
            })
            .catch(e=>reject(e))
    )
};
