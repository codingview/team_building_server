/**
 * Created by zhangrz on 2017/5/11.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

/* 使用Sequelize实现SQL数据库连接 */

const Sequelize = require('sequelize')
    , mysql = require('../../config').mysql
    , sequelize =
    (config = mysql.write)=>
        new Sequelize(
            config.database
            , config.username
            , config.password
            , {
                dialect: config.dialect
                , host: config.host
                , port: config.port
                , timezone: '+08:00'
                , logging: 'logging' in config ? config.logging : console.log
                , define: {
                    underscored: true // 字段以 true:下划线（_）来分割
                    , freezeTableName: true // 锁定表名
                }, pool: {
                    max: 5
                    , min: 0
                    , idle: 10000 // 连接释放时间(ms)
                }
            }
        );

module.exports = {
    // mysql数据库实例
    sequelize: sequelize()

    // Sequelize对象
    , Sequelize: Sequelize

    // 读 实例
    , read: sequelize(mysql.read)

    // 写 实例
    , write: sequelize()
};
