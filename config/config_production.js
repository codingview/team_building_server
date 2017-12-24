/**
 * Created by zrz on 2017/8/22.
 * Copyright© 2015-2020 CodingView (https://github.com/codingview)
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
            , host: '127.0.0.1'
            , username: 'root' // 账号
            , password: 'root' // 密码
            , dialect: 'mysql'
            , logging: false
        }, write: {
            database: 'team_building'
            , host: '127.0.0.1'
            , username: 'root'
            , password: 'root'
            , dialect: 'mysql'
            , logging: false
        }
    }, redis: {
        host: 'localhost'
        , port: 6379
        , db: 6
        , ttl: 86000
        , secret: 'team_building'
        , key: 'team_building'
    }, uploads_image: path.join(__dirname + './../public/uploads') // 上传图片的路径
    , static_html: path.join(__dirname + './../public/static') // 静态html的路径
};
