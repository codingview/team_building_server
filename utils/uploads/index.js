/**
 * Created by zrz on 2017/9/8.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

// 文件上传
const multer = require('multer')
    , config = require('../../config')
    , storage =
    multer
        .diskStorage({ // 存储 - 配置
            destination: (req, file, callback)=>callback(null, config.uploads_images)// 设置上传后文件路径
            , filename: (req, file, callback)=>callback(null, req.filename + '.jpg')// 给上传文件重命名，获取添加后缀名
        })
    , filter = (req, file, callback)=> { // 文件 - 过滤
    const fileFormat = (file.originalname).split('.')
        , ext = fileFormat[fileFormat.length - 1] // 转小写扩展名
        ;
    if (ext === 'jpg' || ext === 'jpeg' ) {
        callback(null, true);
    } else {
        callback('仅支持jpg和jpeg两种格式', false);
    }
};

module.exports = multer({
    storage: storage
    , fileFilter: filter
    , limits: {
        fileSize: 1024 * 1024 * 5 // 文件 - 大小限制 5MB
    }
});
