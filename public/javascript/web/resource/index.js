/**
 * Created by zhangrz on 2017/12/24.
 * Copyright© 2015-2020 CodingView (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

require('../production/animate');

const LENGTH = 12
    , Url = require('../../general/Url.frame')
    , Data = {
    // 分页 - 获取 - 分类商品
    resource: page=>new Promise((resolve, reject)=> {
        $.ajax({
            url: '/api/resource/list'
            , type: 'post'
            , data: page
            , dataType: 'json'
            , success: json=> {
                if (json && 'status' in json && json.status > 0) {
                    resolve(json);
                } else {
                    reject('message' in json ? json.message : '获取基地列表出错');
                }
            }, error: e=> {
                console.error(e);
                reject('获取基地列表超时');
            }
        });
    })
}, Dom = {
    // 加载分类下基地列表
    setResourceList: require('./dom').setResourceList

    // 默认加载分类
    , initCatalog: (offset = Url.get('offset') || 0)=> {
        const cid = Url.get('cid') || -1;
        Data.resource({cid, offset, limit: LENGTH})
            .then(({data, count})=> {
                if (count > 0) {
                    $('#resource_list').html(Dom.setResourceList(data));
                    require('../frame/pagination')(count, LENGTH, Url, (event, page)=> {
                        offset = (page - 1) * LENGTH;
                        history.pushState({}, '基地列表', '?cid=' + cid + '&offset=' + offset);
                        Dom.initCatalog(offset);
                    });
                } else {
                    $('#resource_list').html('<h2 class="ta-c">该分类下无基地</h2>');
                }
            })
            .catch(e=>alert(e));
    }
};

$(function () {
    Dom.initCatalog();
});
