/**
 * Created by zhangrz on 9月17.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

'use strict';

require('../../general/Date.format');
const general = require('./general');

let tableApi // td的api实例
    , _catalogs // 分类列表
    ;

const Table = {
    init: ()=> tableApi = $('#production_list').DataTable({
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
            url: '/admin/production/list'
            , method: 'post'
            , data: json=> {
                json.state = $('#p_list_state').val();
                json.catalog_id = $('#p_catalog').val();
            }
        }, columns: [
            {title: '编号', width: '26px', data: 'id'}
            , {title: '产品名称', data: 'name'}
            , {title: '产品标题', data: 'title'}
            , {title: '产品分类', data: 'catalog_id', render: d=>_catalogs[d]}
            , {
                title: '产品状态'
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
                title: '操作', width: '136px', data: null, render: d=>
                '<a class="btn btn-info btn-xs ml-1e" href="/admin/production/update/' + d.id + '">修改信息</a>' +
                '<button class="btn btn-' + (d.state === 1 ? 'danger' : 'primary') + ' btn-xs ml-1e production-state"' +
                ' data-pid="' + d.id + '" data-state="' + d.state + '">产品'
                + (d.state === 1 ? '下架' : '上架') + '</button>'
            }
        ]
    })
};

const Data = {
    // 产品上下架
    state: (pid, state)=>require('../../general/Ajax.general')({
        url: '/admin/production/state/' + pid + '/' + state
        , type: 'post'
        , text: '产品上下架'
    })
};

const Dom = {
    // 拼接分类列表
    catalogs: ()=> new Promise((resolve, reject)=> {
        general.catalogs()
            .then(catalogs=> {
                _catalogs = general.setCatalogsKv(catalogs);
                $('#p_catalog').html('<option value="-1">--- 全部 ---</option>'
                    + general.setCatalogs(catalogs));
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
            tableApi.ajax.reload();
            Listener.searchSubmit();
        });
    }

    // 产品上下架
    , state: ()=> {
        $('#production_list').on('click', '.production-state', function () {
            const pid = parseInt($(this).data('pid'))
                , state = parseInt($(this).data('state'));
            Data.state(pid, 1 - state)
                .then(()=>tableApi.ajax.reload())
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
