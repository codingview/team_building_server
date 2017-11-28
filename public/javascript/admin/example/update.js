/**
 * Created by zhangrz on 2017/9/27.
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
            console.info(form)
            form.rich_text = editor.txt.html();
            form.text = editor.txt.text();
            form.sequence = form.top ? 0 : 99;
            form.img = parseInt($('#e_icon_val').val());
            delete form.top;
            if (form.name) {
                general.Data.update(form)
                    .then(()=> {
                        location.href = '/admin/example/list';
                    })
                    .catch(e=> {
                        alert(e);
                    });
            } else {
                alert('请输入案例名称');
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
    console.info(6555555555)
    Listener.init();
    editor = general.Dom.editor();
    general.Listener.reset(editor);
});
