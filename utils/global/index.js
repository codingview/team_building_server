/**
 * Created by zrz on 2017/8/22.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const packageConfig = require('../../package.json')
    , _ = {
        ENV: process.env.NODE_ENV || 'development' 	// 环境变量
        , LOGO_NAME: '新易途' 				// LOGO名称
        , SYS_NAME: packageConfig.name 			// 项目名称
        , SYS_VERSION: packageConfig.version 		// 项目版本
        , general: {} 					// 全局内存存储变量，项目启动时将数据从表中读取到该变量内
        , isDev: ()=>GLO.ENV === 'development' 		// 是否为开发环境
        , isPro: ()=>GLO.ENV === 'production' 		// 是否为生产环境
        , success: (data, count)=> { 			// 成功的返回
            if (count) {
                return {status: 1, message: '', data: data, count: count};
            } else {
                return {status: 1, message: '', data: data};
            }
        }
        					
        , error: (error, status = -1, msg = '')=> {	// 错误返回并记录相关信息
	    // error为错误信息时直接输出
            if (typeof error === 'string') { 
                return {
                    status: status
                    , message: error
                    , data: null
                };
	    // 记录错误信息
            } else {
                GLO.logger('error').error(error);
                return {
                    status: status
                    , message: msg
                    , data: null
                };
            }
        }
    };

module.exports = Object.assign(_, require('./logger'));
