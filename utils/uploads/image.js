/**
 * Created by zhangrz on 2017/9/22.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created 图片处理
 */

'use strict';

const multer = require('multer');

module.exports = option=>
    multer({
        storage: multer.diskStorage({ // 存储 - 配置
            destination: (req, file, callback)=>callback(null, option.path)// 设置上传后文件路径
            , filename: (req, file, callback)=>callback(null, option.fileName + '.jpg')// 给上传文件重命名，获取添加后缀名
        })
        , fileFilter: (req, file, callback)=> { // 文件 - 过滤
            const fileFormat = (file.originalname).split('.')
                , ext = fileFormat[fileFormat.length - 1] // 转小写扩展名
                ;
            if (ext === 'jpg' || ext === 'jpeg') {
                callback(null, true);
            } else {
                callback('仅支持jpg和jpeg两种格式', false);
            }
        }
        , limits: {
            fileSize: 1024 * 1024 * 5 // 文件 - 大小限制 5MB
        }
    });
