/**
 * Created by zrz on 2017/9/6.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const Admin = require('../../models').admin;

module.exports = uid=> new Promise((resolve, reject)=>
    // 是否已经存在
    Admin.findOne({where: {id: uid, login_name: {ne: 'admin'}}})
        .then(admin=> {
            if (admin) {
                return admin.destroy();
            } else {
                reject('未找到该管理员账号');
            }
        })
        .then(()=>resolve(true))
        .catch(e=>reject(e))
);

