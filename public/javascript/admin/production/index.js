/**
 * Created by zhangrz on 2017/9/15.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const Editor = window.wangEditor;
let editor; // 全局变量存储富文本对象

const Data = {};

const Dom = {
    // 创建富文本
    editor: ()=> {
        editor = new Editor('#p_editor');
        editor.customConfig.menus = require('../../general/Option.editor'); // 自定义菜单配置
        editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
        editor.customConfig.uploadImgMaxLength = 5; // 限制一次最多上传 5 张图片
        editor.create();
    }

    // 初始化
    , init: function () {
        this.editor();
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