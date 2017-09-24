/**
 * Created by zhangrz on 2017/9/24.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

// 拼装产品列表
module.exports = list=> {
    let str = '';
    list.forEach(p=> {
        str += '<div class="col-lg-3 production-item">' +
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
};
