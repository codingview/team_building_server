/**
 * Created by zhangrz on 2017/11/19.
 * Copyright© 2015-2020 DiandaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

'use strict';

let Type = Type || 1;


const $ajax = require('../../general/Ajax.general')
    , Dom = {}
    , Data = {
    add: catalog=>
        $ajax({
            url: '/admin/catalog/'
            , type: 'post'
            , data: catalog
            , message: '新增分类'
        })
}, Listener = {
    // 新增分类
    addCatalog: ()=> {
        $('#add_catalog').on('click', ()=> {
            $('#catalog_detail').modal('show');
        });
    }
    , init: function () {
        this.addCatalog();
    }
};

$(function () {
    require('./catalog_table')(Type);
    Listener.init();
});
