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
    setCatalogs: (catalogs, type = 'list')=> {
        let str = '';
        const sci = parseInt($('#p_sci_val').val())
            , getSelect = second=>`${second.id === sci ? 'selected' : ''}`;
        catalogs.forEach(first=> {
            if (type === 'list') { // 列表可选择
                // str += `<option value="${first.id}"> ${first.name}</option>`;
            } else { // 其他不可选择
                str += `<optgroup label=" ${first.name}">`;
            }
            if ('second' in first && Array.isArray(first.second) && first.second.length > 0) {
                first.second.forEach(second=> {
                    str += '<option value="' + second.id + '" ' + getSelect(second) +
                        ' data-fci="' + first.id + '" data-sci="' + second.id + '">' +
                        ' >> ' + second.name +
                        '</option>';
                });
            }
            if (type !== 'list') {
                str += '</optgroup>';
            }
        });
        return str;
    }

    // 生成分类列表名称:编号kv结构
    , setCatalogsKv: catalogs=> {
        let secondCatalogsList = {};
        catalogs.forEach(first=> {
            if (first.second) {
                first.second.forEach(second=> {
                    secondCatalogsList[second.id] = second.name;
                });
            }
        });
        return secondCatalogsList;
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
            .then(catalogs=> {
                $('#p_sci').html(Dom.setCatalogs(catalogs, 'add'));
            })
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
        _.fci = $('#p_sci').find('[data-sci="' + _.sci + '"]').data('fci');
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
    if ($('#p_sci').length > 0) {
        Dom.init();
    }
    require('./image')();
});

module.exports = {
    Data: Data
    , Dom: Dom
    , Listener: Listener
    , editor: editor
};
