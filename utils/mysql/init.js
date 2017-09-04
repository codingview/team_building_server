/**
 * Created by zhangrz on 2017/5/12.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

/* 数据库初始化 */

const mysql = require('./index');

// 获取mysql实例并创建表结构
mysql.sequelize
    .sync()
    .then(()=> {
        console.info('表结构创建成功');
    });
