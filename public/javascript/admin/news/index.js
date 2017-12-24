/**
 * Created by zhangrz on 2017/11/29.
 * Copyright© 2015-2020 CodingView (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

require('../../general/Date.format');

const $ajax = require('../../general/Ajax.general')
    // 表格初始化
    , tableInit = ()=> window.tableApi = $('#news_list').DataTable({
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
            url: '/admin/news/list'
            , method: 'post'
        }, columns: [
            {title: '编号', width: '26px', data: 'id'}
            , {title: '新闻标题', data: 'name'}
            , {title: '浏览次数', data: 'views'}
            , {title: '排序值', data: 'sequence'}
            , {title: '创建时间', data: 'created_at', render: t=>new Date(t).format('yyyy-MM-dd hh:mm:ss')}
            , {title: '修改时间', data: 'updated_at', render: t=>new Date(t).format('yyyy-MM-dd hh:mm:ss')}
            , {
                title: '操作', data: null, render: d=>
                '<a class="btn btn-info btn-xs ml-1e" href="/admin/example/update/' + d.example_id + '">修改对应案例信息</a>' +
                '<button class="btn btn-danger btn-xs ml-1e del-news" data-id="' + d.id + '">删除新闻</button>'
            }
        ]
    })
    // 删除新闻
    , delNews = ()=>$('#news_list').on('click', '.del-news', function () {
        const id = parseInt($(this).data('id'));
        $ajax({
            url: '/admin/news/' + id
            , type: 'delete'
        })
            .then(r=>window.tableApi.ajax.reload())
            .catch(e=>alert(e));
    });

$(function () {
    tableInit();
    delNews();
});
