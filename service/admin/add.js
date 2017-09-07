/**
 * Created by zrz on 2017/9/6.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const Admin = require('../../models').admin;

module.exports = admin=> new Promise((resolve, reject)=>
    // 是否已经存在
    Admin.findOne({where: {login_name: admin.login_name}})
        .then(_admin=> {
            if (_admin) {
                return reject('该登录账号已存在');
            } else {
                return Admin.create(admin);
            }
        })
        .then()
        .catch(e=>reject(e))
);
