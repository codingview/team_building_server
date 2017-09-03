/**
 * Created by zhangrz on 2017/5/10.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

console.info(require('../../models'));

const mysql = require('./mysql')
    , Admin = require('../../models').admin
    , crypt = require('../crypt')
    , {pwd, salt}= crypt.encode('123456')
    ;

console.info(pwd, salt);

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
