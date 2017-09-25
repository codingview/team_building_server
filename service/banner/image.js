/**
 * Created by zhangrz on 2017/9/22.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const fs = require('fs')
    , path = require('path')
    , config = require('../../config')
    , imageUploadUtil = require('../../utils/uploads').image
    , filePath = path.join(config.uploads_image, './banner')
    , tempFileName = bid=>bid + '_temp'
    , images = require('images');

const _ = {
    // 保存图片
    save: (req, res)=>new Promise((resolve, reject)=> {
        const bid = parseInt(req.params.bid);
        imageUploadUtil({
            path: filePath
            , fileName: tempFileName(bid)
        }).single('img')(req, res, error=> {
            if (error) {
                reject(error);
            } else {
                const body = req.body;
                body.imgBoo = !!req.file; // 是否有图片
                body.bid = bid;
                resolve(body);
            }
        });
    })

    // 图片转换尺寸,同步方法
    , transform: body=> {
        const tempFilePath = path.join(filePath, `./${tempFileName(body.bid)}.jpg`) // 临时文件路径
            , _bid = '_bid' in body ? body._bid : body.bid
            , bannerFilePath = path.join(filePath, `./${_bid}.jpeg`) // 替换文件路径
            ;
        images(tempFilePath)
            .size(1280, 300)
            .save(bannerFilePath) // 调用fs的writeFileSync方法
        ;
        body.img = `/banner/${_bid}.jpeg`; // 替换后的文件路径
        return body;
    }

    // 删除临时图片
    , removeTempImage: body=>fs.unlinkSync(path.join(filePath, `./${tempFileName(body.bid)}.jpg`))
};

module.exports = _;
