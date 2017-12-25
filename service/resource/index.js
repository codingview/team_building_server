/**
 * Created by zhangrz on 2017/9/24.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created 基地资源
 */

'use strict';

const Resource = require('../../models').resource
    , _Resource = require('../../dao').resource
    , _image = require('./image')
    , _redis = require('../../utils/redis');

module.exports = {
    // 新增 - 基地资源
    create: example=> new Promise((resolve, reject)=> {
        const pp = new _Resource().form2Db(example);
        _image.moveTempImage(pp.md5 + '.jpeg')
            .then(()=> Resource.create(pp))
            .then(r=>resolve(r))
            .catch(e=>reject(e));
    })

    // 上传 - 基地 - 图片
    , image: (req, res)=>new Promise((resolve, reject)=>
        _image.save(req, res)
            .then(body=> {
                _image.transform(body);
                resolve(body);
            })
            .catch(e=>reject(e))
    )

    // 查：基地列表
    , list: ({offset, limit, state, catalog_id})=>new Promise((resolve, reject)=> {
        let _where = {state, catalog_id};
        if (catalog_id === -1) {
            delete _where.catalog_id;
        }
        if (state === -1) {
            delete _where.state;
        }
        Resource.findAndCountAll({where: _where, offset, limit})
            .then(result=> {
                const rows = result.rows;
                let results = [];
                if (rows && rows instanceof Array && rows.length > 0) {
                    rows.forEach(row=> results.push(new _Resource(row.id).db2Api(row.dataValues)));
                    return resolve({results: results, count: result.count});
                } else {
                    return resolve({results: [], count: 0});
                }
            })
            .catch(e=>reject(e));
    })

    // 查：根据分类编号获取基地列表
    , listByCid: params=>new Promise((resolve, reject)=> {
        let where = {};
        if ('catalog_id' in params) {
            where.catalog_id = params.catalog_id;
        }
        Resource
            .findAndCountAll({where, offset: params.offset, limit: params.limit})
            .then(result=> {
                const {rows, count} = result;
                let data = [];
                if (rows && rows instanceof Array && rows.length > 0) {
                    rows.forEach(row=> data.push(new _Resource(row.id).db2Icon(row.dataValues)));
                    return resolve({data, count});
                } else {
                    return resolve({results: [], count: 0});
                }
            })
            .catch(e=>reject(e));
    })

    // 查：基地详情
    , detail: example_id=>new Promise((resolve, reject)=>
        Resource
            .find({where: {id: example_id}})
            .then(p=>resolve(new _Resource(p.id).db2Detail(p.dataValues)))
            .catch(e=>reject(e))
    )

    // 改：基地上/下架
    , state: (example_id, state)=>Resource.update({state: state}, {where: {id: example_id}})

    // 改：更新基地信息
    , update: example=>new Promise((resolve, reject)=> {
        const pp = new _Resource().update(example)
            , eid = example.id;
        if (parseInt(example.img) === 0) { // 图片无变化
            Resource.update(pp, {where: {id: eid}})
                .then(()=>resolve(true))
                .catch(e=>reject(e));
        } else { // 有图片变化
            Resource.find({where: {id: eid}})
                .then(p=>_image.moveTempImage(p.md5 + '.jpeg')) // 移动
                .then(()=> Resource.update(pp, {where: {id: eid}}))
                .then(()=>resolve(true))
                .catch(e=>reject(e));
        }
    })

    // 更新 - redis中文章的浏览次数
    , view: key=>_redis.add(key).catch(e=>GLO.error(e, -99, '文章浏览次数自增失败'))
};
