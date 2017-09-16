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
        editor.create();
    }

    // 初始化
    , init: function () {
        this.editor();
    }
};

const Listener = {};

$(function () {
    Dom.init();
});