/**
 * Created by zhangrz on 9月17.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

'use strict';

require('../../general/Date.format');

let tableApi;

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
        }, columns: [
            {title: '编号', width: '26px', data: 'id'}
            , {title: '产品名称', data: 'name'}
            , {title: '产品标题', data: 'title'}
            , {
                title: '产品状态'
                , data: 'state'
                , render: s=>'<label class="label label-'
                + (s === 1 ? 'info' : 'danger') + '">'
                + (s === 1 ? '正常' : '下架') + '</label>'
            }
            , {title: '浏览次数', data: 'views'}
            , {title: '是否置顶', data: 'sequence'}
            , {title: '创建时间', data: 'created_at', render: t=>new Date(t).format('yyyy-MM-dd hh:mm:ss')}
            , {title: '修改时间', data: 'updated_at', render: t=>new Date(t).format('yyyy-MM-dd hh:mm:ss')}
            , {
                title: '操作', width: '136px', data: null, render: d=>
                '<a class="btn btn-info btn-xs ml-1e" href="/admin/production/update/' + d.id + '">修改信息</a>' +
                '<button class="btn btn-danger btn-xs ml-1e production-off" data-pid="' + d.id + '">产品下架</button>'
            }
        ]
    })
};

$(function () {
    Table.init();
});
