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
    // 新增案例
    add: example=>
        $ajax({
            url: '/admin/example/add'
            , type: 'put'
            , data: example
            , message: '新增案例'
        })


    // 更新案例
    , update: example=>
        $ajax({
            url: '/admin/example/update'
            , type: 'put'
            , data: example
            , message: '更新案例'
        })

    // 获取分类列表
    , catalogs: ()=>new Promise((resolve, reject)=>
        $.ajax({
            url: '/admin/catalog/list?type=1'
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
        const cid = parseInt($('#e_catalog_id_val').val());
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
        editor = new Editor('#e_editor');
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
            .then(catalogs=>$('#e_catalog_id').html(Dom.setCatalogs(catalogs)))
            .catch(e=> {
                console.error(e);
                alert('获取分类列表出错');
            })

    // 获取表单内容
    , getForm: ()=> {
        let _ = {};
        const form = $('#e_form')
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
        _.abstract = $('#e_abstract').val();
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
        $('#e_reset').on('click', ()=> {
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
