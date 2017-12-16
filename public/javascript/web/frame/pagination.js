/**
 * Created by zhangrz on 2017/12/13.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

/**
 * 生成标准分页器
 * @param {int} count 总记录条数
 * @param {int} length 单页记录条数
 * @param {object} Url URL操作
 * @param {function} callback 页面点击回调
 */
module.exports = (count, length, Url, callback)=> {
    const offset = parseInt(Url.get('offset')) || 0;
    $('#pagination_list').twbsPagination({
        totalPages: Math.ceil(count / length) // 共计页数
        , startPage: Math.ceil(offset / length) + 1 // 当前页数
        , visiblePages: 10 // 最大显示页数
        , first: '首页'
        , prev: '上页'
        , next: '下页'
        , last: '尾页'
        , onPageClick: callback
    });
};
