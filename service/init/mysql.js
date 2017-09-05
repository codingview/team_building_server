/**
 * Created by zhangrz on 2017/9/5.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

// 数据初始化
const mysql = require('../../utils/mysql')
    , models = require('../../models')
    , Admin = models.admin
    , crypt = require('../../utils/crypt')
    , {pwd, salt}= crypt.encode('123456')
    ;

module.exports = {
    // 建表
    createTables: ()=> new Promise((resolve, reject)=> {
        Object.keys(models).forEach(model=> {
            models[model].sync();
        });
    })
    // 创建管理员
    , createAdminUser: ()=> {
        mysql.sequelize
            .sync()
            .then(() => Admin.create({
                    name: '超级管理员'
                    , password: pwd
                    , salt: salt
                    , login_name: 'admin'
                })
            )
            .then(data=>console.info(data))
            .catch(e=>console.error(e));
    }
};
