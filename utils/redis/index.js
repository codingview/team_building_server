/**
 * Created by zhangrz on 2017/9/1.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

// redis的读写

const config = require('../../config').redis
    , redis = require('redis')
    , client = redis.createClient(config) // redis客户端
    , setKey = key=>'tbs:' + key
    ;

module.exports = {
    // redis客户端
    client: client

    // 读redis中key
    , get: key=>
        new Promise((resolve, reject)=>
            client.get(setKey(key), (err, reply)=>err ? reject(err) : resolve(reply)))

    // 写redis中key-value
    , set: (key, value)=>
        new Promise((resolve, reject)=>
            client.set(setKey(key), value, (err, reply)=>err ? reject(err) : resolve(reply)))

    // 自增
    , add: function (key) {
        console.info(key)
        const _self = this;
        return new Promise((resolve, reject)=>
            _self.get(key)
                .then(num=>_self.set(key, (parseInt(num) || 0) + 1))
                .then(r=>resolve(r))
                .catch(e=>reject(e))
        );
    }
};
