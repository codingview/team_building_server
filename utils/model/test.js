/**
 * Created by zhangrz on 2017/5/10.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const model = require('./mysql')
    , Admin = require('../../models').Admin
    , crypt = require('../crypt')
    , createAdmin = callback=>Admin(model.Sequelize, mod=> callback(model.sequelize.define('admin', mod)));

model.sequelize
    .sync()
    .then(() => createAdmin(Admin=> {
            Admin.create({
                name: '超级管理员'
                , password: crypt.encode('123456')
                , login_name: 'admin'
            });
        })
    )
    .then(data=>console.info(data))
    .catch(e=>console.error(e));
