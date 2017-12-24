/**
 * Created by zhangrz on 2017/11/29.
 * Copyright© 2015-2020 CodingView (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

// 新增新闻
const $ajax = require('../../general/Ajax.general')
    , Data = {
    // 新增新闻
    addNews: body=>$ajax({
        url: '/admin/news'
        , type: 'post'
        , data: body
        , message: '新增新闻'
    })
}, Dom = {
    // 获取表单数据
    getForm: ()=> {
        const name = $('#news_name').val()
            , example_id = parseInt($('#news_example_id').val())
            , sequence = parseInt($('#news_sequence').val() || 99);
        if (!name) {
            alert('请输入新闻标题');
            return false;
        }
        return {name, example_id, sequence};
    }

    // 初始化模块框
    , initModal: ()=> {
        $('#news_name').val('');
        $('#news_sequence').val('');
    }
}, Listener = {
    // 初始化监听事件
    init: function () {
        this.addNews();
        this.addNewsForm();
    }

    // 新增新闻按钮监听
    , addNews: ()=>$('#example_list').on('click', '.add-news', function () {
        Dom.initModal();
        $('#news_example_id').val($(this).data('id')); // 绑定的案例编号
        $('#news_detail').modal('show'); // 显示模态框
    })

    // 新增新闻form提交
    , addNewsForm: ()=>$('#news_detail_submit').one('click', ()=> {
        const form = Dom.getForm();
        if (form) {
            Data.addNews(form)
                .then(r=> {
                    $('#news_detail').modal('hide');
                    window.tableApi.ajax.reload();
                });
        }
        Listener.addNewsForm();
    })
};

$(function () {
    Listener.init();
});
