/**
 * Created by zhangrz on 2017/9/4.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

// 数据初始化
const mysql = require('../../utils/mysql')
    , Admin = require('../../models').admin
    , crypt = require('../../utils/crypt')
    , {pwd, salt}= crypt.encode('123456')
    ;

// 创建管理员
const CreateAdminUser = ()=> {
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
};

CreateAdminUser();
