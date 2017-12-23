/**
 * Created by zhangrz on 2017/8/23.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const LENGTH = 4
    , feedback = require('../frame').feedback
    , $ajax = require('../../general/Ajax.general')
    , resourceDom = require('../resource/dom')
    , Data = {
    // 根据分类获取商品
    production: data=>
        $ajax({
            url: '/api/production/list'
            , type: 'post'
            , data: data
            , message: '获取产品列表'
        })

    // 获取 - 新闻
    , news: data=>
        $ajax({
            url: '/api/home/news/list'
            , type: 'get'
            , data: data
            , message: '获取新闻列表'
        })

    // 获取 - 基地分类列表
    , resourceCatalog: ()=>
        $ajax({
            url: '/api/home/catalog/list?type=2'
            , type: 'get'
            , message: '获取基地分类列表'
        })

    // 获取 - 基地列表
    , resource: cid=>
        $ajax({
            url: '/api/resource/list'
            , type: 'post'
            , data: {limit: 12, cid}
            , message: '获取基地列表'
        })

}
    , Dom = {
    // 初始化 - 广告位
    initSwiper: ()=> {
        const swiperNews = new Swiper('#news_swiper', {
            direction: 'horizontal'
            , loop: true
            // 分页器
            , pagination: '.swiper-pagination'
            // 前进后退按钮
            , nextButton: '.swiper-button-next'
            , prevButton: '.swiper-button-prev'
        });
    }

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

    // 获取 - 基地分类下基地列表
    , setResourceList: cid=> {
        Data.resource(cid)
            .then(list=> {
                $('#resource_catalog_'+cid).html(resourceDom.list(list));
            })
            .catch(alert);
    }

    // 注入 - 分类下产品列表
    , setCatalog: (sci, list)=> {
        $('#catalog_' + sci).html(list.length > 0 ? Dom.setProductionList(list) : '<h2 class="ta-c">该分类下无产品</h2>');
    }

    // 初始化 - 第一个分类下产品列表
    , initCatalog: ()=> {
        const sci = parseInt($('#production_catalogs').find('a[data-toggle="tab"]').eq(0).data('sci'));
        Data.production({limit: 3, sci})
            .then(list=>Dom.setCatalog(sci, list))
            .catch(alert);
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

    // 初始化 - 基地分类列表
    , initResourceCatalog: ()=> {
        Data.resourceCatalog()
            .then(list=> {
                $('#resource_catalogs').html(resourceDom.catalogs(list));
                $('#resource_list').html(resourceDom.tabList(list));
                Dom.setResourceList(list[0].id);
            })
            .catch(alert);
    }

    // 初始化
    , init: function () {
        this.initSwiper();
        this.initCatalog();
        this.initNews();
        this.initResourceCatalog();
    }
}
    , Listener = {
    // 分类切换的监听
    catalogChangeListener: ()=> {
        // 产品分类切换监听
        $('#production_catalogs').on('show.bs.tab', 'a[data-toggle="tab"]', event=> {
            const $p = $(event.target)
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

        // 基地分类切换监听
        $('#resource_catalogs').on('show.bs.tab', 'a[data-toggle="tab"]', event=> {
            const $p = $(event.target)
                , isShow = parseInt($p.data('show'))
                , cid = parseInt($p.data('cid'))
                ;
            if (isShow === 0) { // 未显示过
                Dom.setResourceList(cid);
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
