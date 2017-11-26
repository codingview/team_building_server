/**
 * Created by zhangrz on 2017/11/19.
 * Copyright© 2015-2020 DiandaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

'use strict';

let Type = Type || 1
    , tableApi;

const $ajax = require('../../general/Ajax.general')
    , Dom = {
    // 获取分类表单内容
    getForm: ()=>({
        id: parseInt($('#catalog_id').val())
        , name: $('#catalog_name').val()
        , sequence: parseInt($('#catalog_sequence').val())
        , type: Type
    })
    // modal的赋值
    , initModal: (id = -1, name = '', sequence = '')=> {
        $('#catalog_id').val(id);
        $('#catalog_name').val(name);
        $('#catalog_sequence').val(sequence);
    }
    // alert
    , setAlert: message=> {

    }
}
    , Data = {
    add: catalog=>
        $ajax({
            url: '/admin/catalog'
            , type: 'post'
            , data: catalog
            , message: '新增分类'
        })
    , update: catalog=>
        $ajax({
            url: '/admin/catalog'
            , type: 'put'
            , data: catalog
            , message: '更新分类'
        })
    , del: catalog_id=>
        $ajax({
            url: '/admin/catalog/' + catalog_id
            , type: 'delete'
            , message: '删除分类'
        })
}, Listener = {
    // 新增分类
    addCatalog: ()=> {
        $('#add_catalog').on('click', ()=> {
            $('#catalog_detail').modal('show');
        });
    }

    // 删除分类
    , delCatalog: ()=> {
        $('#catalog_list').on('click', '.catalog-delete', function () {
            Data.del($(this).data('id'))
                .then(()=>tableApi.ajax.reload())
                .catch(Dom.setAlert);
        });
    }

    // 更新分类
    , upCatalog: ()=> {
        $('#catalog_list').on('click', '.catalog-update', function () {
            const $b = $(this);
            Dom.initModal(parseInt($b.data('id')), $b.data('name'), parseInt($b.data('sequence')));
            $('#catalog_detail').modal('show');
        });
    }
    // 表单提交
    , formOneSubmit: ()=> {
        $('#catalog_detail_submit').one('click', ()=> {
            const catalog = Dom.getForm();
            if (catalog.id !== -1) { // 更新
                Data.update(catalog)
                    .then(r=> {
                        tableApi.ajax.reload();
                        $('#catalog_detail').modal('hide');
                    })
                    .catch(Dom.setAlert(e));
            } else { // 新增
                delete catalog.id;
                Data.add(catalog)
                    .then(r=> {
                        tableApi.ajax.reload();
                        $('#catalog_detail').modal('hide');
                    })
                    .catch(Dom.setAlert(e));
            }
            Listener.formOneSubmit();
        });
    }

    , init: function () {
        $('#catalog_detail').on('hidden.bs.modal', ()=> {
            Dom.initModal();
        });
        this.addCatalog();
        this.upCatalog();
        this.delCatalog();
        this.formOneSubmit();
    }
};

$(function () {
    tableApi = require('./catalog_table')(Type);
    Listener.init();
});
