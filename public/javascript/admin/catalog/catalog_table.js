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
                '<button type="button" class="btn btn-info btn-xs ml-1e catalog-update"' +
                ' data-id="' + d.id + '" data-name="' + d.name + '" data-sequence="' + d.sequence + '">更新分类</button>' +
                '<button type="button" class="btn btn-danger btn-xs ml-1e catalog-delete"' +
                ' data-id="' + d.id + '">删除分类</button>'
            }
        ]
    });
