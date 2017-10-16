/**
 * Created by zrz on 2017/9/6.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const Admin = require('../../models').admin
    , crypt = require('../../utils/crypt');

module.exports = admin=> new Promise((resolve, reject)=>
    // 是否已经存在
    Admin.findOne({where: {id: admin.id}})
        .then(user=> {
            if (user) {
                user.login_name = admin.login_name;
                user.name = admin.name;
                if ('password' in admin) {
                    const pp = crypt.encode(admin.password);
                    user.password = pp.pwd;
                    user.salt = pp.salt;
                }
                return user.save();
            } else {
                reject('未找到该管理员信息');
            }
        })
        .then(()=>resolve(true))
        .catch(e=>reject(e))
);

