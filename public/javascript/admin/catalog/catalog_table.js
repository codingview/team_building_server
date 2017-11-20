/**
 * Created by zhangrz on 2017/11/19.
 * Copyright© 2015-2020 DiandaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

'use strict';

// 通用分类列表
module.exports = type=>
    $('#catalog_list').DataTable({
        language: require('../../general/DT.language')
        , paging: false
        , searching: false
        , ordering: false
        , processing: true
        , serverSide: true
        , autoWidth: true
        , stateSave: false
        , ajax: {
            url: `/admin/catalog/list?type=${type}`
            , method: 'post'
        }, columns: [
            {title: '编号', width: '26px', data: 'id'}
            , {title: '分类名称', data: 'name'}
            , {title: '排序序号', data: 'sequence'}
            , {
                title: '操作', width: '136px', data: null, render: d=>
                '<a class="btn btn-info btn-xs ml-1e" href="/admin/production/update/' + d.id + '">修改信息</a>' +
                '<button class="btn btn-' + (d.state === 1 ? 'danger' : 'primary') + ' btn-xs ml-1e production-state"' +
                ' data-pid="' + d.id + '" data-state="' + d.state + '">产品'
                + (d.state === 1 ? '下架' : '上架') + '</button>'
            }
        ]
    });
