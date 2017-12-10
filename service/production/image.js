/**
 * Created by zhangrz on 2017/9/26.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const fs = require('fs')
    , path = require('path')
    , config = require('../../config')
    , imageUploadUtil = require('../../utils/uploads').image
    , filePath = path.join(config.uploads_image, './production')
    , images = require('images')
    , imagesService = {
    // 保存图片
    save: (req, res)=>new Promise((resolve, reject)=> {
        imageUploadUtil({
            path: filePath
            , fileName: 'temp' // 为了防止出现多个临时文件
        }).single('img')(req, res, error=> {
            if (error) {
                reject(error);
            } else {
                resolve({image: path.join(filePath, 'temp.jpeg')});
            }
        });
    })

    // 图片转换尺寸,同步方法
    , transform: body=>
        images(body.image)
            .size(320, 240)
            .save(body.image) // 调用fs的writeFileSync方法

    // 删除临时图片
    , removeTempImage: body=>fs.unlinkSync(body.image)

    // 移动临时文件
    , moveTempImage: fileName=>
        new Promise((resolve, reject)=>
            fs.rename(path.join(filePath, 'temp.jpeg'), path.join(filePath, fileName), err=> {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            })
        )
};

module.exports = imagesService;
