/**
 * Created by zrz on 2017/9/6.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

require('../../general/Date.format');

let tableApi;

const Table = {
    init: ()=> tableApi = $('#feedback_list').DataTable({
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
            url: '/admin/option/feedback/list'
            , method: 'post'
        }, columns: [
            {title: '序号', width: '2em', data: 'fid'}
            , {title: '用户姓名', width: '6em', data: 'title'}
            , {title: '用户手机', width: '5em', data: 'phone'}
            , {
                title: '是否已阅', width: '4em', data: 'state', render: s=>
                '<label class="label label-'
                + (s === 0 ? 'info' : 'default') + '">'
                + (s === 0 ? '未读' : '已读') + '</label>'
            }
            , {title: '反馈内容', data: 'content'}
            , {title: '创建时间', width: '10em', data: 'created_at', render: t=>new Date(t).format('yyyy-MM-dd hh:mm:ss')}
            , {title: '修改时间', width: '10em', data: 'updated_at', render: t=>new Date(t).format('yyyy-MM-dd hh:mm:ss')}
            , {
                title: '操作', width: '3em', data: null, render: d=>
                    d.state === 0 ? '<button class="btn btn-primary btn-xs" data-fid="' + d.fid + '">已阅</button>' : ''
            }
        ]
    })
};

$(function () {
    Table.init();
});
