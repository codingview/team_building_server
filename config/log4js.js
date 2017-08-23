/**
 * Created by zrz on 2017/4/27.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const path = require('path');

module.exports = {
    development: {
        appenders: {
            out: { // 控制台输出
                type: 'stdout'
            }, app: {// 系统日志
                type: 'file'
                , filename: path.join(__dirname, '../logs/app.log')
            }, http: { // 请求日志
                type: 'file'
                , filename: path.join(__dirname, '../logs/http.log')
            }, error: {
                type: 'file'
                , filename: path.join(__dirname, '../logs/error.log')
            }
        }, categories: {
            default: {
                appenders: ['app', 'out']
                , level: 'info'
            }, http: {
                appenders: ['http', 'out']
                , level: 'info'
            }, error: {
                appenders: ['error', 'out']
                , level: 'error'
            }
        }
    }
};
