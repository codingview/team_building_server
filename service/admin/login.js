/**
 * Created by zhangrz on 2017/8/31.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const mysql = require('../../utils/model/mysql')
    ,admin=require('../../models').Admin(mysql.Sequelize).mod
    ,Admin=mysql.sequelize.define('admin',admin);

// 根据 用户输入账号密码判别是否可以登录
module.exports = (login_name, password)=> {
   mysql.read.query()
};