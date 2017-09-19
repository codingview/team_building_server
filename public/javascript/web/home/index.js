/**
 * Created by zhangrz on 2017/8/23.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

let swiper;
const LENGTH = 4
    , feedback = require('../frame').feedback;

const Data = {
    // 根据分类获取商品
    production: data=>new Promise((resolve, reject)=>
        $.ajax({
            url: '/api/production/list'
            , type: 'post'
            , data: data
            , dataType: 'json'
            , success: json=> {
                if (json && 'status' in json && json.status > 0) {
                    resolve(json.data);
                } else {
                    reject('message' in json ? json.message : '获取产品列表出错');
                }
            }, error: e=> {
                console.error(e);
                reject('获取产品列表超时');
            }
        })
    )
};

const Dom = {
    // 初始化 - 广告位
    initSwiper: ()=>
        swiper = new Swiper('.swiper-container', {
            direction: 'horizontal'
            , loop: true
            // 分页器
            , pagination: '.swiper-pagination'
            // 前进后退按钮
            , nextButton: '.swiper-button-next'
            , prevButton: '.swiper-button-prev'
        })

    // 生成 - 产品列表
    , setProductionList: list=> {
        let str = '';
        list.forEach(p=> {
            str += '<div class="col-lg-3 production-item">' +
                '<div class="production-icon">' +
                '<img src="' + p.icon + '">' +
                '<a href="/production/detail/' + p.id + '" class="production-layout" target="_blank">' +
                '<div class="production-title">' + p.title + '</div>' +
                '<div class="production-abstract">' + p.abstract + '</div>' +
                '</a>' +
                '</div>' +
                '</div>';
        });
        return str;
    }

    // 注入 - 分类下产品列表
    , setCatalog: (cid, list)=>$('#catalog_' + cid).html(Dom.setProductionList(list))

    // 初始化 - 第一个分类下产品列表
    , initCatalog: ()=> {
        const cid = parseInt($('#production_catalogs').find('a[data-toggle="tab"]').eq(0).data('cid'));
        Data.production({limit: 3, cid: cid})
            .then(list=>Dom.setCatalog(cid, list))
            .catch(e=>alert(e));
    }

    // 初始化
    , init: function () {
        this.initSwiper();
        this.initCatalog();
    }
};

const Listener = {
    // 分类切换的监听
    catalogChangeListener: ()=> {
        $('#production_catalogs').on('show.bs.tab', 'a[data-toggle="tab"]', function () {
            const $p = $(this)
                , isShow = parseInt($p.data('show'))
                , cid = parseInt($p.data('cid'))
                ;
            if (isShow === 0) { // 未显示过
                Data.production({limit: LENGTH, cid: cid})
                    .then(list=>Dom.setCatalog(cid, list))
                    .catch(e=>alert(e));
                $p.data('show', 1);
            }
        });
    }

    // 初始化
    , init: function () {
        this.catalogChangeListener();
    }
};

$(function () {
    Dom.init();
    Listener.init();
    feedback();
});
