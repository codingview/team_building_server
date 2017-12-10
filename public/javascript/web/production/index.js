/**
 * Created by zhangrz on 2017/9/24.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const $ajax = require('../../general/Ajax.general')
    , Url = require('../../general/Url.frame');

const Data = {
    // 分页 - 获取 - 分类商品
    production: page=>$ajax({
        url: '/api/production/list'
        , type: 'post'
        , data: page
        , text: '获取产品列表'
    })
};

const Dom = {
    // 加载分类
    setProductionList: require('./dom')

    // 默认加载分类
    , initCatalog: ()=> {
        const sci = Url.get('sci') || DEFAULT_CATALOG_ID;
        Data.production({sci})
            .then(list=>$('#production_list').html(Dom.setProductionList(list)))
            .catch(e=>alert(e));
    }
};

$(function () {
    Dom.initCatalog();
});
