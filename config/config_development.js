/**
 * Created by zrz on 2017/8/22.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const path = require('path');

module.exports = {
    host: ''
    , port: 3000
    , mysql: {
        read: { // 读写分离
            database: 'team_building'
            , host: '192.168.1.101'
            , port: 3307
            , username: 'dddev' // 账号
            , password: '123456' // 密码
            , dialect: 'mysql'
        }, write: {
            database: 'team_building'
            , host: '192.168.1.101'
            , port: 3307
            , username: 'dddev'
            , password: '123456'
            , dialect: 'mysql'
        }
    }, redis: {
        host: '192.168.1.101'
        , port: 6379
        , db: 3
        , ttl: 86000
        , secret: 'team_building'
        , key: 'team_building'
    }, uploads_image: path.join(__dirname + './../public/uploads') // 上传图片的路径
    , static_html: path.join(__dirname + './../public/static') // 静态html的路径
};
