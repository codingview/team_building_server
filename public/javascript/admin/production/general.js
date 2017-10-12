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
    // 新增产品
    add: production=>
        $ajax({
            url: '/admin/production/add'
            , type: 'put'
            , data: production
            , message: '新增产品'
        })


    // 更新产品
    , update: production=>
        $ajax({
            url: '/admin/production/update'
            , type: 'put'
            , data: production
            , message: '更新产品'
        })

    // 获取分类列表
    , catalogs: ()=>new Promise((resolve, reject)=>
        $.ajax({
            url: '/admin/production/catalog/list'
            , type: 'get'
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
        const cid = parseInt($('#p_catalog_id_val').val());
        catalogs.forEach(catalog=> {
            str += `<optgroup label="${catalog.name}">`;
            if ('children' in catalog && catalog.children instanceof Array && catalog.children.length > 0) {
                catalog.children.forEach(child=> {
                    str += `<option value="${child.id}" ${child.id === cid ? 'selected' : ''}>${child.name}</option>`;
                });
            }
            str += '</optgroup>';
        });
        return str;
    }

    // 生成分类列表名称:编号kv结构
    , setCatalogsKv: catalogs=> {
        let _ = {};
        catalogs.forEach(catalog=> {
            _[catalog.id] = catalog.name;
            if (catalog.children) {
                catalog.children.forEach(child=> {
                    _[child.id] = child.name;
                });
            }
        });
        return _;
    }
    // 创建富文本
    , editor: ()=> {
        editor = new Editor('#p_editor');
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
            .then(catalogs=>$('#p_catalog_id').html(Dom.setCatalogs(catalogs)))
            .catch(e=> {
                console.error(e);
                alert('获取分类列表出错');
            })

    // 获取表单内容
    , getForm: ()=> {
        let _ = {};
        const form = $('#p_form')
            , inputs = form.find('input,select');
        for (let i = 0, len = inputs.length; i < len; i++) {
            const input = inputs.eq(i)
                , _id = input.attr('id').replace(/p_/g, '')
                ;
            if (_id === 'text') {
            } else if (_id === 'top') {
                _.top = input.is(':checked');
            } else {
                _[_id] = input.val();
            }
        }
        _.abstract = $('#p_abstract').val();
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
        $('#p_reset').on('click', ()=> {
            editor.txt.clear();
        });
    }

};

// 页面初始化
$(function () {
    Dom.init();
    require('./image')();
});

module.exports = {
    Data: Data
    , Dom: Dom
    , Listener: Listener
    , editor: editor
};
