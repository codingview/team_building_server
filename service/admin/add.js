/**
 * Created by zrz on 2017/9/6.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const Admin = require('../../models').admin
    , _admin = require('../../dao').admin
    , crypt = require('../../utils/crypt');

module.exports = admin=> new Promise((resolve, reject)=>
    // 是否已经存在
    Admin.findOne({where: {login_name: admin.login_name}})
        .then(result=> {
            if (result) {
                reject('该登录账号已存在');
            } else {
                const {pwd, salt}=crypt.encode(admin.password);
                admin.password = pwd;
                admin.salt = salt;
                return Admin.create(admin);
            }
        })
        .then(r=>r ? resolve(new _admin().db2Api(r)) : reject('创建管理员账号失败*'))
        .catch(e=>reject(e))
);
