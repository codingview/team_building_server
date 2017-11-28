/**
 * Created by zhangrz on 9月17.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

'use strict';

/* 产品管理 */

const Production = require('../../models').production
    , _Production = require('../../dao').production
    , _image = require('./image')
    , _redis = require('../../utils/redis');

module.exports = {
    // 增：新增产品
    create: production=> new Promise((resolve, reject)=> {
        const pp = new _Production().form2Db(production);
        _image.moveTempImage(pp.md5 + '.jpeg')
            .then(()=> Production.create(pp))
            .then(r=>resolve(r))
            .catch(e=>reject(e));
    })

    // 上传 - 产品 - 图片
    , image: (req, res)=>new Promise((resolve, reject)=>
        _image.save(req, res)
            .then(body=> {
                _image.transform(body);
                resolve(body);
            })
            .catch(e=>reject(e))
    )


    // 查：产品列表
    , list: ({offset, limit, state, catalog_id})=>new Promise((resolve, reject)=> {
        let _where = {state, catalog_id};
        if (catalog_id === -1) {
            delete _where.catalog_id;
        }
        if (state === -1) {
            delete _where.state;
        }
        Production.findAndCountAll({where: _where, offset, limit})
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
            .catch(e=>reject(e));
    })

    // 查：根据分类编号获取商品列表
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

    // 查：产品详情
    , detail: production_id=>new Promise((resolve, reject)=>
        Production
            .find({where: {id: production_id}})
            .then(p=>resolve(new _Production(p.id).db2Detail(p.dataValues)))
            .catch(e=>reject(e))
    )

    // 改：产品上/下架
    , state: (production_id, state)=>Production.update({state: state}, {where: {id: production_id}})

    // 改：更新产品信息
    , update: production=>new Promise((resolve, reject)=> {
        const pp = new _Production().update(production)
            , pid = production.id;
        if (parseInt(production.img) === 0) { // 图片无变化
            Production.update(pp, {where: {id: pid}})
                .then(()=>resolve(true))
                .catch(e=>reject(e));
        } else { // 有图片变化
            Production.find({where: {id: pid}})
                .then(p=>_image.moveTempImage(p.md5 + '.jpeg')) // 移动
                .then(()=> Production.update(pp, {where: {id: pid}}))
                .then(()=>resolve(true))
                .catch(e=>reject(e));
        }
    })

    // 更新 - redis中文章的浏览次数
    , view: key=>_redis.add(key).catch(e=>GLO.error(e, -99, '文章浏览次数自增失败'))
};
