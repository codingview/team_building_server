/**
 * Created by zhangrz on 2017/11/19.
 * Copyright© 2015-2020 CodingView (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

require('../../general/Date.format');

const general = require('./general');

let _catalogs; // 分类列表

const Table = {
    init: ()=> window.tableApi = $('#resource_list').DataTable({
        language: require('../../general/DT.language')
        , paginType: 'full_numbers'
        , lengthMenu: [ // 显示记录条数
            [10, 25, 50]
            , [10, 25, 50]
        ]
        , searching: false
        , ordering: false
        , processing: true
        , serverSide: true
        , autoWidth: true
        , stateSave: true
        , ajax: {
            url: '/admin/resource/list'
            , method: 'post'
            , data: json=> {
                json.state = $('#resource_list_state').val();
                json.catalog_id = $('#resource_catalog').val();
            }
        }, columns: [
            {title: '编号', width: '26px', data: 'id'}
            , {title: '基地名称', data: 'name'}
            , {title: '基地标题', data: 'title'}
            , {title: '基地分类', data: 'catalog_id', render: d=>_catalogs[d]}
            , {
                title: '基地状态'
                , data: 'state'
                , render: s=>'<label class="label label-'
                + (s === 1 ? 'primary' : 'danger') + '">'
                + (s === 1 ? '正常' : '下架') + '</label>'
            }
            , {title: '浏览次数', data: 'views'}
            , {title: '是否置顶', data: 'sequence', render: d=>(d === 0 ? '是' : '否')}
            , {title: '创建时间', data: 'created_at', render: t=>new Date(t).format('yyyy-MM-dd hh:mm:ss')}
            , {title: '修改时间', data: 'updated_at', render: t=>new Date(t).format('yyyy-MM-dd hh:mm:ss')}
            , {
                title: '操作', data: null, render: d=>
                '<a class="btn btn-info btn-xs ml-1e" href="/admin/resource/update/' + d.id + '">修改信息</a>' +
                '<button class="btn btn-' + (d.state === 1 ? 'danger' : 'primary') + ' btn-xs ml-1e resource-state"' +
                ' data-pid="' + d.id + '" data-state="' + d.state + '">基地' +
                (d.state === 1 ? '下架' : '上架') + '</button>'
            }
        ]
    })
};

const Data = {
    // 基地上下架
    state: (pid, state)=>require('../../general/Ajax.general')({
        url: '/admin/resource/state/' + pid + '/' + state
        , type: 'post'
        , text: '基地上下架'
    })
};

const Dom = {
    // 拼接分类列表
    catalogs: ()=> new Promise((resolve, reject)=> {
        general.Data.catalogs()
            .then(catalogs=> {
                _catalogs = general.Dom.setCatalogsKv(catalogs);
                $('#resource_catalog').html('<option value="-1">--- 全部 ---</option>'
                    + general.Dom.setCatalogs(catalogs));
                resolve();
            })
            .catch(e=>reject(e));
    })

    // 初始化
    , init: function () {
        this.catalogs()
            .then(()=>Table.init())
            .catch(e=>alert(e));
    }
};

const Listener = {
    // 查询按钮的监听
    searchSubmit: ()=> {
        $('#search_submit').one('click', function () {
            window.tableApi.ajax.reload();
            Listener.searchSubmit();
        });
    }

    // 基地上下架
    , state: ()=> {
        $('#resource_list').on('click', '.resource-state', function () {
            const pid = parseInt($(this).data('pid'))
                , state = parseInt($(this).data('state'));
            Data.state(pid, 1 - state)
                .then(()=>window.tableApi.ajax.reload())
                .catch(e=>alert(e));
        });
    }

    // 初始化
    , init: function () {
        this.searchSubmit();
        this.state();
    }
};

$(function () {
    Dom.init();
    Listener.init();
});
