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
    // 获取 - 新闻
    , news: data=>new Promise((resolve, reject)=>
        $.ajax({
            url: '/api/home/news/list'
            , type: 'get'
            , data: data
            , dataType: 'json'
            , success: json=> {
                if (json && 'status' in json && json.status > 0) {
                    resolve(json.data);
                } else {
                    reject('message' in json ? json.message : '获取新闻列表出错');
                }
            }, error: e=> {
                console.error(e);
                reject('获取新闻列表超时');
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
    , setProductionList: require('../production/dom')

    // 写入 - 新闻轮播
    , setNewsList: array=> {
        let str = '';
        array.forEach(a=> {
            str += `<a href="/news/detail/${a.id}" class="list-group-item list-group-item-info">
    <h4 class="list-group-item-heading">${a.name}</h4>
    <p class="list-group-item-text">${a.abstract}</p>
</a>`;
        });
        return str;
    }
    // 写入 - 新闻列表
    , setNewsBanner: array=> {
        let str = '';
        array.forEach(a=> {
            str += `<div class="swiper-slide">
    <a href="/news/detail/${a.id}">
        <div class=""><img src="/uploads${a.icon}" width="100%"></div>
        <div class="mt-1e"><h3>${a.name}</h3></div>
        <div class="mt-1e" style="font-size:16px;"><h4>${a.abstract}</h4></div>
    </a>
</div>`;
        });
        return str;
    }

    // 注入 - 分类下产品列表
    , setCatalog: (sci, list)=> {
        $('#catalog_' + sci).html(list.length > 0 ? Dom.setProductionList(list) : '<h2>该分类下无产品</h2>');
    }

    // 初始化 - 第一个分类下产品列表
    , initCatalog: ()=> {
        const sci = parseInt($('#production_catalogs').find('a[data-toggle="tab"]').eq(0).data('sci'));
        Data.production({limit: 3, sci})
            .then(list=>Dom.setCatalog(sci, list))
            .catch(e=>alert(e));
    }

    // 初始化 - 新闻列表
    , initNews: ()=> {
        Data.news({limit: 6})
            .then(list=> {
                $('#home_news_banner').html(Dom.setNewsBanner(list));
                $('#home_news_list').html(Dom.setNewsList(list));
            })
            .catch(e=>alert(e));
    }

    // 初始化
    , init: function () {
        this.initSwiper();
        this.initCatalog();
        this.initNews();
    }
};

const Listener = {
    // 分类切换的监听
    catalogChangeListener: ()=> {
        $('#production_catalogs').on('show.bs.tab', 'a[data-toggle="tab"]', function () {
            const $p = $(this)
                , isShow = parseInt($p.data('show'))
                , sci = parseInt($p.data('sci'))
                ;
            if (isShow === 0) { // 未显示过
                Data.production({limit: LENGTH, sci})
                    .then(list=>Dom.setCatalog(sci, list))
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
