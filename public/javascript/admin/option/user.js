/**
 * Created by zrz on 2017/9/6.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

let tableApi;

const Table = {
    init: ()=> tableApi = $('#user_list').DataTable({
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
            url: '/admin/option/user/list'
            , method: 'post'
        }, columns: [
            {title: '序号', width: '24px', data: 'uid'}
            , {title: '管理员', class: '', data: 'title'}
            , {title: '登录账号', class: '', data: 'user_name'}
            , {title: '创建时间', class: '', data: 'created_at'}
            , {title: '修改时间', class: '', data: 'updated_at'}
            , {
                title: '操作', width: '136px', data: null, render: d=>
                '<button class="btn btn-info btn-xs ml-1e" data-bc="' + d.bc + '">修改信息</button>' +
                '<button class="btn btn-danger btn-xs ml-1e barcode-delete" data-bc="' + d.bc + '">删除</button>'
            }
        ]
    })
};

$(function () {
    Table.init();
});
