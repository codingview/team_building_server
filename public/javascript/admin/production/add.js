/**
 * Created by zhangrz on 2017/9/15.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const general = require('./general');

let editor = general.editor;

const Listener = {
    // 表单 - 提交 - 监听
    setOneSubmit: ()=> {
        $('#p_submit').one('click', ()=> {
            let form = general.Dom.getForm();
            form.rich_text = editor.txt.html();
            form.text = editor.txt.text();
            form.sequence = form.top ? 0 : 99;
            form.img = parseInt($('#p_icon_val').val());
            if (form.img === 0) {
                Listener.setOneSubmit();
                alert('请上传缩略图');
                return false;
            }
            delete form.top;
            if (form.name) {
                general.Data.add(form)
                    .then(()=> {
                        location.href = '/admin/production/list';
                    })
                    .catch(e=> {
                        alert(e);
                    });
            } else {
                alert('请输入产品名称');
            }
            Listener.setOneSubmit();
        });
    }

    // 初始化
    , init: function () {
        this.setOneSubmit();
    }
};

$(function () {
    Listener.init();
    editor = general.Dom.editor();
    general.Listener.reset(editor);
});
