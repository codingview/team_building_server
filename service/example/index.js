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

    // 更新 - redis中文章的浏览次数
    , view: key=>_redis.add(key).catch(e=>GLO.error(e, -99, '文章浏览次数自增失败'))
};
