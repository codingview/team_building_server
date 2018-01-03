/**
 * Created by zhangrz on 2018/1/3.
 * Copyright© 2015-2020 CodingView (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

// 产品的动画效果

let st; // setTimeout的标记
// 获取动画元素
const getEle = event=> $(event.target).parents('.production-icon').find('.production-layout')
    , show = event=> { // 展开效果
    clearTimeout(st);
    const ele = getEle(event);
    ele
        .stop()
        .animate({
            height: '100%'
            , width: '100%'
            , top: 0
            , left: 0
        }, 500);
    st = setTimeout(()=> {
        ele.find('.production-title').fadeIn(200);
        ele.find('.production-abstract').fadeIn(500);
    }, 400);
}
    , hide = event=> { // 关闭效果
    clearTimeout(st);
    const ele = getEle(event);
    ele
        .stop()
        .animate({
            height: 0
            , width: 0
            , top: '50%'
            , left: '50%'
        }, 500);
    st = setTimeout(()=> {
        ele.find('.production-title').fadeOut();
        ele.find('.production-abstract').fadeOut();
    }, 200);
};

$(function () {
    $(document).on('mouseover', '.production-icon', show);
    $(document).on('mouseout', '.production-icon', hide);
});
