/**
 * Created by zhangrz on 2017/9/21.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created 关于我们
 */

'use strict';

const __path = require('../../config').static_html
    , fs = require('fs')
    , path = require('path')
    , filePath = active=>path.join(__path, './about/' + active + '.html');

module.exports = {
    // 保存静态文件
    save: (active, rich_text)=>new Promise((resolve, reject)=>
        fs.writeFile(filePath(active), rich_text, err=> {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    )

    // 读取静态文件
    , read: active=>new Promise((resolve, reject)=>
        fs.readFile(filePath(active), 'utf8', (err, html)=> {
            if (err) {
                reject(err);
            } else {
                resolve(html);
            }
        })
    )
};
