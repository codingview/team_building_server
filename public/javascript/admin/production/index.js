/**
 * Created by zhangrz on 2017/9/15.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const Editor = window.wangEditor;
let editor; // 全局变量存储富文本对象

const Data = {
    // 获取分类列表
    catalogs: require('./general').catalogs

    // 新增产品
    , add: production=>
        $.ajax({
            url: '/admin/production/add'
            , type: 'put'
            , data: production
            , dataType: 'json'
            , success: json=> {
                if (json && 'status' in json && json.status > 0) {
                    resolve();
                } else {
                    reject('message' in json ? json.message : '新增产品出错');
                }
            }, error: e=> {
                console.error(e);
                reject('新增产品超时');
            }
        })
};

const Dom = {
    // 创建富文本
    editor: ()=> {
        editor = new Editor('#p_editor');
        editor.customConfig.menus = require('../../general/Option.editor'); // 自定义菜单配置
        editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
        editor.customConfig.uploadImgMaxLength = 5; // 限制一次最多上传 5 张图片
        editor.create();
    }

    // 分类列表
    , catalogs: ()=> {
        Data.catalogs()
            .then(catalogs=>$('#p_catalog_id').html(Dom.setCatalog(catalogs)))
            .catch(e=> {
                console.error(e);
                alert('获取分类列表出错');
            })

    }

    // 生产分类列表
    , setCatalog: catalogs=> {
        let str = '';
        catalogs.forEach(catalog=> {
            str += `<optgroup label="${catalog.name}">`;
            if ('children' in catalog && catalog.children instanceof Array && catalog.children.length > 0) {
                catalog.children.forEach(child=> {
                    str += `<option value="${child.id}">${child.name}</option>`;
                });
            }
            str += '</optgroup>';
        });
        return str;
    }

    // 获取表单内容
    , getForm: ()=> {
        let _ = {};
        const form = $('#p_form')
            , inputs = form.find('input,select');
        for (let i = 0, len = inputs.length; i < len; i++) {
            const input = inputs.eq(i)
                , _id = input.attr('id').replace(/p_/g, '')
                ;
            if (_id !== 'text') {
                _[_id] = input.val();
            }
        }
        return _;
    }

    // 初始化
    , init: function () {
        this.editor();
        this.catalogs();
    }
};

const Listener = {
    // 表单 - 提交 - 监听
    setOneSubmit: ()=> {
        $('#p_submit').one('click', ()=> {
            let form = Dom.getForm();
            form.rich_text = editor.txt.html();
            form.text = editor.txt.text();
            form.sequence = form.top === 'on' ? 0 : 99;
            delete form.top;
            Data.add(form)
                .then(r=>location.href = '/admin/production/list')
                .catch(e=>Listener.setOneSubmit());
        });
    }

    // 初始化
    , init: function () {
        this.setOneSubmit();
    }
};

$(function () {
    Dom.init();
    Listener.init();
});