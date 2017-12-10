/**
 * Created by zhangrz on 2017/9/15.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const $ajax = require('../../general/Ajax.general')
    , Data = {
    // 删除分类的接口
    deleteCatalog: (cid, type)=>$ajax({
        url: '/admin/production/catalog/' + type + '/' + cid
        , type: 'delete'
        , message: '删除产品分类'
    })

    // 保存分类的接口
    , saveCatalog: (type, data)=> {
        if (data.id === -1) {
            delete data.id;
            return $ajax({
                url: '/admin/production/catalog/' + type
                , type: 'post'
                , data: data
                , message: '新增产品分类'
            });
        } else {
            return $ajax({
                url: '/admin/production/catalog/' + type
                , type: 'put'
                , data: data
                , message: '新增产品分类'
            });
        }
    }
}, Dom = {
    // 获取分类表单数据
    getForm: type=> {
        let formData = {};
        const id = parseInt($(`#${type}_id`).val())
            , name = $(`#${type}_name`).val()
            , sequence = parseInt($(`#${type}_sequence`).val())
            , home_show = $(`#${type}_home_show`).is(':checked') || false;
        if (!name) {
            alert('请输入分类名称');
            return false;
        }
        if (!(sequence >= 0)) {
            alert('请输入排序值');
            return false;
        }
        formData = {id, name, sequence, home_show};
        if (type === 'second') {
            const first_catalog_id = parseInt($('#second_first_catalog_id').val());
            if (!(first_catalog_id >= 0)) {
                alert('请输入一级分类编号');
                return false;
            } else {
                formData.first_catalog_id = first_catalog_id;
            }
        }
        return formData;
    }

    // 填充form
    , setForm: (type, id = -1, name = '', sequence = '', home_show = false, fid = '')=> {
        $(`#${type}_id`).val(id);
        $(`#${type}_name`).val(name);
        $(`#${type}_sequence`).val(sequence);
        $(`#${type}_home_show`).prop('checked', home_show);
        if (type === 'second') {
            $('#second_first_catalog_id').val(fid);
        }
    }

}, Listener = {
    // 删除分类的监听
    deleteCatalog: ()=> {
        const delCatalog = (cid, type)=> {
            Data.deleteCatalog(cid, type)
                .then(()=>Table.reload(type))
                .catch(alert);
        };
        $('#first_catalog_list').on('click', '.del-first', event=> {
            const cid = parseInt($(event.target).data('id'));
            delCatalog(cid, 'first');
        });
        $('#second_catalog_list').on('click', '.del-second', event=> {
            const cid = parseInt($(event.target).data('id'));
            delCatalog(cid, 'second');
        });
    }

    // 保存分类的监听
    , saveCatalog: type=> {
        $(`#${type}_submit`).one('click', event=> {
            const data = Dom.getForm(type);
            if (data) {
                Data.saveCatalog(type, data)
                    .then(()=> {
                        Dom.setForm(type);
                        Table.reload(type);
                        Listener.saveCatalog(type);
                    })
                    .catch(e=> {
                        Listener.saveCatalog(type);
                        alert(e);
                    });
            } else {
                Listener.saveCatalog(type);
            }
        });
    }

    // 修改的监听
    , updateCatalog: ()=> {
        const upCatalog = ($t, type)=> {
            const id = $t.data('id')
                , name = $t.data('name')
                , sequence = $t.data('sequence')
                , home_show = $t.data('home');
            let fid = '';
            if (type === 'second') {
                fid = $t.data('first');
            }
            Dom.setForm(type, id, name, sequence, home_show, fid);
        };
        $('#first_catalog_list').on('click', '.up-first', event=> {
            upCatalog($(event.target), 'first');
        });
        $('#second_catalog_list').on('click', '.up-second', event=> {
            upCatalog($(event.target), 'second');
        });
    }

    // 监听初始化
    , init: function () {
        this.deleteCatalog();
        this.saveCatalog('first');
        this.saveCatalog('second');
        this.updateCatalog();
    }
}
    , Table = {
    reload: type=>Table[type + 'TableApi'].ajax.reload()
    , firstTableApi: null
    , secondTableApi: null
    , firstCatalogTable: ()=>Table.firstTableApi = $('#first_catalog_list').DataTable({
        language: require('../../general/DT.language')
        , paging: false
        , searching: false
        , ordering: false
        , processing: true
        , serverSide: true
        , autoWidth: true
        , stateSave: false
        , ajax: {
            url: '/admin/production/catalog/first/list'
            , method: 'post'
        }, columns: [
            {title: '编号', width: '26px', data: 'id'}
            , {title: '分类名称', data: 'name'}
            , {title: '排序值', data: 'sequence'}
            , {title: '首页是否显示', data: 'home_show', render: d=>d ? '是' : '否'}
            , {
                title: '操作', data: null, render: d=>
                '<button class="btn btn-info btn-xs ml-1e up-first"' +
                ' data-id="' + d.id + '" data-name="' + d.name + '" data-sequence="' + d.sequence + '"' +
                ' data-home="' + d.home_show + '">修改</button>' +
                '<button class="btn btn-danger btn-xs ml-1e del-first" data-id="' + d.id + '">删除</button>'
            }
        ]
    })
    , secondCatalogTable: ()=>Table.secondTableApi = $('#second_catalog_list').DataTable({
        language: require('../../general/DT.language')
        , paging: false
        , searching: false
        , ordering: false
        , processing: true
        , serverSide: true
        , autoWidth: true
        , stateSave: false
        , ajax: {
            url: '/admin/production/catalog/second/list'
            , method: 'post'
        }, columns: [
            {title: '编号', width: '26px', data: 'id'}
            , {title: '分类名称', data: 'name'}
            , {title: '一级分类编号', data: 'first_catalog_id'}
            , {title: '排序值', data: 'sequence'}
            , {title: '首页是否显示', data: 'home_show', render: d=>d ? '是' : '否'}
            , {
                title: '操作', data: null, render: d=>
                '<button class="btn btn-info btn-xs ml-1e up-second"' +
                ' data-id="' + d.id + '" data-name="' + d.name + '" data-sequence="' + d.sequence + '"' +
                ' data-home="' + d.home_show + '" data-first="' + d.first_catalog_id + '">修改</button>' +
                '<button class="btn btn-danger btn-xs ml-1e del-second" data-id="' + d.id + '">删除</button>'
            }
        ]
    })
};

$(function () {
    Table.firstCatalogTable();
    Table.secondCatalogTable();
    Listener.init();
});
