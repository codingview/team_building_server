/**
 * Created by zhangrz on 2017/9/20.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const Editor = window.wangEditor;
let editor; // 全局变量存储富文本对象

const Data = {
    // 保存
    save: form=>require('../general/Ajax.general')({
        url: '/admin/about/s/' + form.active
        , text: '设置关于我们'
        , data: form
    })

    // 读取
    , read: active=>require('../general/Ajax.general')({
        url: '/admin/about/s/' + active
        , text: '读取关于我们'
        , type: 'get'
    })
};

const Dom = {
    // 创建富文本
    editor: ()=> {
        editor = new Editor('#about_content');
        editor.customConfig.menus = require('../general/Option.editor'); // 自定义菜单配置
        editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
        editor.customConfig.uploadImgMaxLength = 5; // 限制一次最多上传 5 张图片
        editor.customConfig.pasteFilterStyle = false; // 关闭粘贴样式的过滤
        editor.create();
    }

    // 默认加载home内容
    , load: ()=>
        Data.read('home')
            .then(rt=>editor.txt.html(rt))
            .catch(e=>alert(e))

    // 初始化
    , init: function () {
        this.editor();
        this.load();
    }
};

const Listener = {
    // 保存
    save: ()=> {
        $('#about_submit').one('click', function () {
            Data.save({
                    active: $('#about_module').val()
                    , rt: editor.txt.html()
                })
                .then(()=>alert('保存成功'))
                .catch(e=>alert(e));
            Listener.save();
        });
    }

    // 切换栏目
    , changeModule: ()=> {
        $('#about_module').on('change', function () {
            editor.txt.clear();
            Data.read($(this).val())
                .then(rt=>editor.txt.html(rt))
                .catch(e=>alert(e));
        });
    }

    // 初始化
    , init: function () {
        this.save();
        this.changeModule();
    }
};

$(function () {
    Dom.init();
    Listener.init();
});
