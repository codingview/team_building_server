/**
 * Created by zhangrz on 2017/5/10.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const model = require('./mysql')
    , admin = require('../../models').Admin(model.Sequelize).mod;

const Admin = model.sequelize.define('admin', admin)
    , crypt = require('../crypt')
    ;

const {pwd, salt}= crypt.encode('123456');

console.info(pwd, salt);

model.sequelize
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
