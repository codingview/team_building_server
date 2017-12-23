/**
 * Created by zhangrz on 2017/9/24.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';
const resourceDom = {

    // 基地分类列表
    catalogs: list=> {
        let str = '', i = 0;
        list.forEach(c=> {
            str += '<li role="presentation" class="' + (i++ === 0 ? 'active' : '') + '">' +
                '<a href="#resource_catalog_' + c.id + '" aria-controls="resource_catalog_' + c.id + '"' +
                ' role="tab" data-toggle="tab" data-show="' + (i++ === 0 ? 1 : 0) + '"' +
                ' data-cid="' + c.id + '">' + c.name +
                '</a>' +
                '</li>';
        });
        return str;
    }

    // 基地列表tab
    , tabList: list=> {
        let str = '', i = 0;
        list.forEach(c=> {
            str += '<div role="tabpanel" class="tab-pane bases-list ' + (i++ === 0 ? 'active' : '') + '"' +
                ' id="resource_catalog_' + c.id + '">' +
                '</div>';
        });
        return str;
    }

    // 基地列表
    , list: list=> {
        let str = '';
        if (Array.isArray(list) && list.length > 0) {
            list.forEach(p=> {
                str += resourceDom.item(p);
            });
        } else {
            str = '<div>' +
                '<h2>该基地分类下无基地</h2>' +
                '</div>';
        }
        return str;
    }

    // 基地效果
    , item: p=>'<div class="col-lg-3 production-item">' +
    '<div class="production-icon">' +
    '<img src="' + p.icon + '">' +
    '<a href="/production/detail/' + p.id + '" class="production-layout" target="_blank">' +
    '<div class="production-title">' + p.title + '</div>' +
    '<div class="production-abstract">' + (p.abstract || '') + '</div>' +
    '</a>' +
    '</div>' +
    '</div>'
};


// 拼装基地dom
module.exports = resourceDom;
