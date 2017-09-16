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
            const html = editor.txt.html()
                , text = editor.txt.text();
            console.info(html)
            console.info(text)
            Listener.setOneSubmit();
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