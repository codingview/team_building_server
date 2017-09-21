/**
 * Created by zhangrz on 2017/9/21.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

/**
 * @param {object} option
 * @return {Promise}
 */
module.exports = option=>new Promise((resolve, reject)=> {
    const text = 'text' in option ? option.text : '';
    $.ajax({
        url: option.url
        , type: 'type' in option ? option.type : 'post'
        , data: 'data' in option ? option.data : {}
        , dataType: 'json'
        , success: json=> {
            if (json && 'status' in json && json.status > 0) {
                resolve(json.data);
            } else {
                reject('message' in json ? json.message : text + '出错');
            }
        }, error: e=> {
            console.error(e);
            reject(text + '超时');
        }
    });
});
