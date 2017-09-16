/**
 * Created by zhangrz on 9月17.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

'use strict';

module.exports={
    // 获取分类列表
    catalogs:()=>new Promise((resolve, reject)=>
            $.ajax({
                url: '/admin/production/catalog/list'
                , type: 'get'
                , dataType: 'json'
                , success: json=> {
                    if (json && 'status' in json && json.status > 0) {
                        resolve(json.data);
                    } else {
                        reject('message' in json ? json.message : '获取分类列表出错');
                    }
                }, error: e=> {
                    console.error(e);
                    reject('获取分类列表超时');
                }
            })
    )
};