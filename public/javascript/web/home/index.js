/**
 * Created by zhangrz on 2017/8/23.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

require('../production/animate'); // 产品的动画效果

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
    // 初始化 - 广告位swiper
    initNewsSwiper: ()=> {
        const newsSwiper = new Swiper('#news_swiper', {
            slidesPerView: 1
            , effect: 'flip'
            , grabCursor: true
            , loop: true
            , pagination: {
                el: '.swiper-pagination'
                , clickable: true
            }
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
        <div class="news-icon"><img src="/uploads${a.icon}" width="100%"></div>
        <div class="news-name mt-1e"><h3>${a.name}</h3></div>
        <div class="news-abstract mt-1e" style="font-size:16px;"><h4>${a.abstract}</h4></div>
    </a>
</div>`;
        });
        return str;
    }

    // 获取 - 基地分类下基地列表
    , setResourceList: cid=> {
        Data.resource(cid)
            .then(list=> {
                const $e = '#resource_catalog_' + cid + '_container';
                $('#resource_catalog_' + cid + '_content').html(resourceDom.list(list));
                if (Array.isArray(list) && list.length > 1) {
                    new Swiper($e, {
                        slidesPerView: 4
                        , spaceBetween: 30
                        , slidesPerGroup: 4
                        , pagination: {
                            el: '.swiper-pagination'
                            , clickable: true
                            // }, navigation: {
                            //     nextEl: '.swiper-button-next'
                            //     , prevEl: '.swiper-button-prev'
                        }
                    });
                } else { // 移除翻页
                    $($e)
                        .find('.swiper-button-next')
                        .remove()
                        .end()
                        .find('.swiper-button-prev')
                        .remove();
                }
            })
            .catch(alert);
    }

    // 注入 - 分类下产品列表
    , setCatalog: (sci, list)=> {
        $('#catalog_' + sci).html(list.length > 0 ? Dom.setProductionList(list) : '<h2 class="ta-c">该分类下无产品</h2>');
    }

    // 初始化 - banner的swiper
    , initBannerSwiper: ()=> {
        const bannerSwiper = new Swiper('#banner_swiper', {
            slidesPerView: 1
            , effect: 'cube' // 切换效果
            , grabCursor: true
            , loop: true
            , pagination: {
                el: '.swiper-pagination'
                , clickable: true
            }, navigation: { // 翻页按钮
                nextEl: '.swiper-button-next'
                , prevEl: '.swiper-button-prev'
            }, autoplay: { // 自动播放
                delay: 5000
                , stopOnLastSlide: false
                , disableOnInteraction: true
            }
        });
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
                Dom.initNewsSwiper();
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
        this.initCatalog();
        this.initNews();
        this.initResourceCatalog();
        this.initBannerSwiper();
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

    // 基地的动画效果
    , resourceAnimate: ()=> {
        // const getEle = event=> $(event.target);
        // $('#resource_list')
        //     .on('mouseover', '.swiper-slide', event=> {
        //         getEle(event)
        //             .parents('.swiper-slide')
        //             .find('.resource-item-hover')
        //             .show()
        //             .stop()
        //             .animate({
        //                 top: 0
        //             }, 300);
        //     })
        //     .on('mouseout', '.swiper-slide', event=> {
        //
        //     });
    }

    // 初始化
    , init: function () {
        this.catalogChangeListener();
        // this.resourceAnimate();
    }
};

$(function () {
    Dom.init();
    Listener.init();
    feedback();
});
