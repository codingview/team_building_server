/**
 * Created by zhangrz on 2017/11/28.
 * Copyright© 2015-2020 DiandaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

'use strict';

const Example = require('../../models').example
    , _Example = require('../../dao').example
    , _image = require('./image')
    , _redis = require('../../utils/redis');

module.exports = {
    // 新增 - 服务案例
    create: example=> new Promise((resolve, reject)=> {
        const pp = new _Example().form2Db(example);
        _image.moveTempImage(pp.md5 + '.jpeg')
            .then(()=> Example.create(pp))
            .then(r=>resolve(r))
            .catch(e=>reject(e));
    })

    // 上传 - 案例 - 图片
    , image: (req, res)=>new Promise((resolve, reject)=>
        _image.save(req, res)
            .then(body=> {
                _image.transform(body);
                resolve(body);
            })
            .catch(e=>reject(e))
    )

    // 查：案例列表
    , list: ({offset, limit, state, catalog_id})=>new Promise((resolve, reject)=> {
        let _where = {state, catalog_id};
        if (catalog_id === -1) {
            delete _where.catalog_id;
        }
        if (state === -1) {
            delete _where.state;
        }
        Example.findAndCountAll({where: _where, offset, limit})
            .then(result=> {
                const rows = result.rows;
                let results = [];
                if (rows && rows instanceof Array && rows.length > 0) {
                    rows.forEach(row=> results.push(new _Example(row.id).db2Api(row.dataValues)));
                    return resolve({results: results, count: result.count});
                } else {
                    return resolve({results: [], count: 0});
                }
            })
            .catch(e=>reject(e));
    })

    // 查：根据分类编号获取商品列表
    , listByCid: params=>new Promise((resolve, reject)=>
        Example
            .findAndCountAll({where: {catalog_id: params.catalog_id}, offset: params.offset, limit: params.limit})
            .then(result=> {
                const rows = result.rows;
                let results = [];
                if (rows && rows instanceof Array && rows.length > 0) {
                    rows.forEach(row=> results.push(new _Example(row.id).db2Icon(row.dataValues)));
                    return resolve({results: results, count: result.count});
                } else {
                    return resolve({results: [], count: 0});
                }
            })
            .catch(e=>reject(e))
    )

    // 查：案例详情
    , detail: example_id=>new Promise((resolve, reject)=>
        Example
            .find({where: {id: example_id}})
            .then(p=>resolve(new _Example(p.id).db2Detail(p.dataValues)))
            .catch(e=>reject(e))
    )

    // 改：案例上/下架
    , state: (example_id, state)=>Example.update({state: state}, {where: {id: example_id}})

    // 改：更新案例信息
    , update: example=>new Promise((resolve, reject)=> {
        const pp = new _Example().update(example)
            , eid = example.id;
        if (parseInt(example.img) === 0) { // 图片无变化
            Example.update(pp, {where: {id: eid}})
                .then(()=>resolve(true))
                .catch(e=>reject(e));
        } else { // 有图片变化
            Example.find({where: {id: eid}})
                .then(p=>_image.moveTempImage(p.md5 + '.jpeg')) // 移动
                .then(()=> Example.update(pp, {where: {id: eid}}))
                .then(()=>resolve(true))
                .catch(e=>reject(e));
        }
    })

    // 更新 - redis中文章的浏览次数
    , view: key=>_redis.add(key).catch(e=>GLO.error(e, -99, '文章浏览次数自增失败'))
};
