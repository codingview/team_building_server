/**
 * Created by zhangrz on 2017/8/23.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

let swiper;

const Data = {};

const Dom = {
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
    , init: function () {
        this.initSwiper();
    }
};

const Listener = {};

$(function () {
    Dom.init();
});
