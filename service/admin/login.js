/**
 * Created by zhangrz on 2017/8/31.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const Admin = require('../../models').admin
    , crypt = require('../../utils/crypt');

// 根据 用户输入账号密码判别是否可以登录
module.exports = ({login_name, password})=>
    new Promise((resolve, reject)=>
        Admin.findOne({where: {login_name: login_name}})
            .then(admin=>
                resolve(!!admin
                    && crypt.equal(password, admin.password) // 判断密码是否合法
                    && {name: admin.name}
                )
            )
            .catch(e=>resolve(e))
    );
