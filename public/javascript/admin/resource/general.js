/**
 * Created by zhangrz on 9月17.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

'use strict';

let editor;

const $ajax = require('../../general/Ajax.general');

const Editor = window.wangEditor
    , Data = {
    // 新增基地
    add: resource=>
        $ajax({
            url: '/admin/resource/add'
            , type: 'put'
            , data: resource
            , message: '新增基地'
        })


    // 更新基地
    , update: resource=>
        $ajax({
            url: '/admin/resource/update'
            , type: 'put'
            , data: resource
            , message: '更新基地'
        })

    // 获取分类列表
    , catalogs: ()=>new Promise((resolve, reject)=>
        $.ajax({
            url: '/admin/catalog/list?type=2'
            , type: 'post'
            , dataType: 'json'
            , success: json=> {
                if (json && 'status' in json && json.status > 0) {
                    resolve(json.data);
                } else {
                    reject('message' in json ? json.message : '获取分类列表出错');
                }
            }, error: e=> {
                console.error(e);
                reject('获取分类列表超时');
            }
        })
    )
}
    , Dom = {
    // 生成分类列表
    setCatalogs: catalogs=> {
        let str = '';
        const cid = parseInt($('#resource_catalog_id_val').val());
        catalogs.forEach(catalog=> {
            str += `<option value="${catalog.id}" ${catalog.id === cid ? 'selected' : ''}>${catalog.name}</option>`;
        });
        return str;
    }

    // 生成分类列表名称:编号kv结构
    , setCatalogsKv: catalogs=> {
        let _ = {};
        catalogs.forEach(catalog=> {
            _[catalog.id] = catalog.name;
        });
        return _;
    }

    // 创建富文本
    , editor: ()=> {
        editor = new Editor('#resource_editor');
        editor.customConfig.menus = require('../../general/Option.editor'); // 自定义菜单配置
        editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
        editor.customConfig.uploadImgMaxLength = 5; // 限制一次最多上传 5 张图片
        editor.customConfig.pasteFilterStyle = false; // 关闭粘贴样式的过滤
        editor.create();
        return editor;
    }

    // 分类列表
    , catalogs: ()=>
        Data.catalogs()
            .then(catalogs=>$('#resource_catalog_id').html(Dom.setCatalogs(catalogs)))
            .catch(e=> {
                console.error(e);
                alert('获取分类列表出错');
            })

    // 获取表单内容
    , getForm: ()=> {
        let _ = {};
        const form = $('#resource_form')
            , inputs = form.find('input,select');
        for (let i = 0, len = inputs.length; i < len; i++) {
            const input = inputs.eq(i)
                , _id = input.attr('id').replace(/resource_/g, '')
                ;
            if (_id === 'text') {
            } else if (_id === 'top') {
                _.top = input.is(':checked');
            } else {
                _[_id] = input.val();
            }
        }
        _.abstract = $('#resource_abstract').val();
        return _;
    }

    // 初始化
    , init: function () {
        this.catalogs();
    }
}
    , Listener = {
    // 重置表单时清空富文本
    reset: editor=> {
        $('#resource_reset').on('click', ()=> {
            editor.txt.clear();
        });
    }

};

// 页面初始化
$(function () {
    if ($('#resource_catalog_id').length > 0) {
        Dom.init();
    }
    require('./image')();
});

module.exports = {
    Data: Data
    , Dom: Dom
    , Listener: Listener
    , editor: editor
};
