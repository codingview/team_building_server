/**
 * Created by zhangrz on 2017/11/19.
 * Copyright© 2015-2020 DiandaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

'use strict';

require('../../general/Date.format');
require('../news/add'); // 新增新闻

const general = require('./general');


let _catalogs // 分类列表
    ;

const Table = {
    init: ()=> window.tableApi = $('#example_list').DataTable({
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
            url: '/admin/example/list'
            , method: 'post'
            , data: json=> {
                json.state = $('#e_list_state').val();
                json.catalog_id = $('#e_catalog').val();
            }
        }, columns: [
            {title: '编号', width: '26px', data: 'id'}
            , {title: '案例名称', data: 'name'}
            , {title: '案例标题', data: 'title'}
            , {title: '案例分类', data: 'catalog_id', render: d=>_catalogs[d]}
            , {
                title: '案例状态'
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
                '<a class="btn btn-info btn-xs ml-1e" href="/admin/example/update/' + d.id + '">修改信息</a>' +
                '<button class="btn btn-' + (d.state === 1 ? 'danger' : 'primary') + ' btn-xs ml-1e example-state"' +
                ' data-pid="' + d.id + '" data-state="' + d.state + '">案例' +
                (d.state === 1 ? '下架' : '上架') + '</button>' +
                '<button class="btn btn-xs btn-warning ml-1e add-news" data-id="' + d.id + '">新增新闻</button>'
            }
        ]
    })
};

const Data = {
    // 案例上下架
    state: (pid, state)=>require('../../general/Ajax.general')({
        url: '/admin/example/state/' + pid + '/' + state
        , type: 'post'
        , text: '案例上下架'
    })
};

const Dom = {
    // 拼接分类列表
    catalogs: ()=> new Promise((resolve, reject)=> {
        general.Data.catalogs()
            .then(catalogs=> {
                _catalogs = general.Dom.setCatalogsKv(catalogs);
                $('#e_catalog').html('<option value="-1">--- 全部 ---</option>'
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

    // 案例上下架
    , state: ()=> {
        $('#example_list').on('click', '.example-state', function () {
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
