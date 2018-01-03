/**
 * Created by zhangrz on 2017/9/24.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

require('./animate');

const LENGTH = 12
    , Url = require('../../general/Url.frame')
    , Data = {
    // 分页 - 获取 - 分类商品
    production: page=>new Promise((resolve, reject)=> {
        $.ajax({
            url: '/api/production/list'
            , type: 'post'
            , data: page
            , dataType: 'json'
            , success: json=> {
                if (json && 'status' in json && json.status > 0) {
                    resolve(json);
                } else {
                    reject('message' in json ? json.message : '获取产品列表出错');
                }
            }, error: e=> {
                console.error(e);
                reject('获取产品列表超时');
            }
        });
    })
}, Dom = {
    // 加载分类
    setProductionList: require('./dom')

    // 默认加载分类
    , initCatalog: (offset = Url.get('offset') || 0)=> {
        const sci = Url.get('sci') || -1;
        Data.production({sci, offset, limit: LENGTH})
            .then(({data, count})=> {
                if (count > 0) {
                    $('#production_list').html(Dom.setProductionList(data));
                    require('../frame/pagination')(count, LENGTH, Url, (event, page)=> {
                        offset = (page - 1) * LENGTH;
                        history.pushState({}, '产品列表', '?sci=' + sci + '&offset=' + offset);
                        Dom.initCatalog(offset);
                    });
                } else {
                    $('#production_list').html('<h2 class="ta-c">该分类下无产品</h2>');
                }
            })
            .catch(e=>alert(e));
    }
};

$(function () {
    Dom.initCatalog();
});
