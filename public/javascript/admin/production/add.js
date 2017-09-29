/**
 * Created by zhangrz on 2017/9/15.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const Editor = window.wangEditor
    , general = require('./general');

let editor; // 全局变量存储富文本对象

const Data = {
    // 获取分类列表
    catalogs: general.catalogs

    // 新增产品
    , add: production=>new Promise((resolve, reject)=>
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
    )
};

const Dom = {
    // 创建富文本
    editor: ()=> {
        editor = new Editor('#p_editor');
        editor.customConfig.menus = require('../../general/Option.editor'); // 自定义菜单配置
        editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
        editor.customConfig.uploadImgMaxLength = 5; // 限制一次最多上传 5 张图片
        editor.customConfig.pasteFilterStyle = false; // 关闭粘贴样式的过滤
        editor.create();
    }

    // 分类列表
    , catalogs: ()=>
        Data.catalogs()
            .then(catalogs=>$('#p_catalog_id').html(Dom.setCatalog(catalogs)))
            .catch(e=> {
                console.error(e);
                alert('获取分类列表出错');
            })

    // 生成分类列表
    , setCatalog: general.setCatalogs

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
            form.sequence = form.top ? 0 : 99;
            form.img = parseInt($('#p_icon_val').val());
            delete form.top;
            if (form.name) {
                Data.add(form)
                    .then(r=> {
                        // location.href = '/admin/production/list'
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

    // 重置表单时清空富文本
    , reset: ()=> {
        $('#p_reset').on('click', ()=> {
            editor.txt.clear();
        });
    }

    // 初始化
    , init: function () {
        this.setOneSubmit();
        this.reset();
    }
};

$(function () {
    Dom.init();
    Listener.init();
    require('./image')();
});
