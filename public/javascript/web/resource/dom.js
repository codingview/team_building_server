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
            str += '<div role="tabpanel" class="tab-pane resource-list ' + (i++ === 0 ? 'active' : '') + '"' +
                ' id="resource_catalog_' + c.id + '">' +
                '<div class="swiper-container">' +
                '<div class="swiper-wrapper" id="resource_catalog_' + c.id + '_content"></div>' +
                '</div>' +
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
    , item: r=>'<div class="swiper-slide">' +
    '<div class="resource-item">' +
    '<a href="/resource/detail/' + r.id + '?md5=' + r.md5 + '">' +
    '<div class="resource-icon mt-1e"><img width="100%" src="' + r.icon + '"></div>' +
    '<div class="resource-title mt-1e"><h2>' + r.title + '</h2></div>' +
    '<div class="resource-abstract mt-1e">' + r.abstract + '</div>' +
    '</a>' +
    '</div>' +
    '</div>'
};


// 拼装基地dom
module.exports = resourceDom;
