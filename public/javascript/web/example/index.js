/**
 * Created by zhangrz on 2017/12/19.
 * Copyright© 2015-2020 CodingView (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

require('../production/animate');

const LENGTH = 12
    , Url = require('../../general/Url.frame')
    , Data = {
    // 分页 - 获取 - 分类商品
    example: page=>new Promise((resolve, reject)=> {
        $.ajax({
            url: '/api/example/list'
            , type: 'post'
            , data: page
            , dataType: 'json'
            , success: json=> {
                if (json && 'status' in json && json.status > 0) {
                    resolve(json);
                } else {
                    reject('message' in json ? json.message : '获取案例列表出错');
                }
            }, error: e=> {
                console.error(e);
                reject('获取案例列表超时');
            }
        });
    })
}, Dom = {

    // 加载案例列表
    setExampleList: list=> {
        let str = '';
        list.forEach(p=> {
            str += '<div class="col-lg-4 production-item">' +
                '<div class="production-icon">' +
                '<img src="' + p.icon + '">' +
                '<a href="/production/detail/' + p.id + '" class="production-layout" target="_blank">' +
                '<div class="production-title">' + p.title + '</div>' +
                '<div class="production-abstract">' + (p.abstract || '') + '</div>' +
                '</a>' +
                '</div>' +
                '</div>';
        });
        return str;
    }

    // 默认加载分类
    , initCatalog: (offset = Url.get('offset') || 0)=> {
        const cid = Url.get('cid') || -1;
        Data.example({cid, offset, limit: LENGTH})
            .then(({data, count})=> {
                if (count > 0) {
                    $('#example_list').html(Dom.setExampleList(data));
                    require('../frame/pagination')(count, LENGTH, Url, (event, page)=> {
                        offset = (page - 1) * LENGTH;
                        history.pushState({}, '案例列表', '?cid=' + cid + '&offset=' + offset);
                        Dom.initCatalog(offset);
                    });
                } else {
                    $('#example_list').html('<h2 class="ta-c">该分类下无案例</h2>');
                }
            })
            .catch(e=>alert(e));
    }
};

$(function () {
    Dom.initCatalog();
});
