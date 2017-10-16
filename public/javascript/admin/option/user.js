/**
 * Created by zrz on 2017/9/6.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

require('../../general/Date.format');

const $ajax = require('../../general/Ajax.general');

let tableApi;

const Table = {
    init: ()=> tableApi = $('#user_list').DataTable({
        language: require('../../general/DT.language')
        , paginType: 'full_numbers'
        , lengthMenu: [ // 显示记录条数
            [10, 25, 50]
            , [10, 25, 50]
        ]
        , searching: false
        , ordering: false
        , processing: true
        , serverSide: true
        , autoWidth: true
        , stateSave: true
        , ajax: {
            url: '/admin/option/user/list'
            , method: 'post'
        }, columns: [
            {title: '序号', width: '24px', data: 'uid'}
            , {title: '管理员', class: '', data: 'title'}
            , {title: '登录账号', class: '', data: 'user_name'}
            , {title: '创建时间', class: '', data: 'created_at', render: t=>new Date(t).format('yyyy-MM-dd hh:mm:ss')}
            , {title: '修改时间', class: '', data: 'updated_at', render: t=>new Date(t).format('yyyy-MM-dd hh:mm:ss')}
            , {
                title: '操作', width: '136px', data: null, render: d=>
                '<button class="btn btn-info btn-xs ml-1e user-update"' +
                ' data-uid="' + d.uid + '" data-un="' + d.user_name + '" data-title="' + d.title + '">修改信息</button>' +
                (d.user_name === 'admin' ? '' : '<button class="btn btn-danger btn-xs ml-1e user-remove"' +
                ' data-uid="' + d.uid + '">删除</button>')
            }
        ]
    })
};

const Data = {
    // 新增管理员
    add: user=>$ajax({
        url: '/admin/option/user'
        , type: 'post'
        , data: user
        , message: '新增管理员'
    })

    // 删除管理员
    , remove: uid=>$ajax({
        url: '/admin/option/user/' + uid
        , type: 'delete'
        , message: '删除管理员'
    })

    // 更新管理员
    , update: user=>$ajax({
        url: '/admin/option/user/' + user.uid
        , type: 'put'
        , data: user
        , message: '更新管理员'
    })
};

const Dom = {
    // 初始化form
    initForm: ()=> {
        $('#p_form').get(0).reset();
        $('#u_uid').val(-1);
    }

    // 填充数据
    , setForm: (n, l)=> {
        $('#u_name').val(n);
        $('#u_login').val(l);
    }

    // 获取数据
    , getForm: ()=> ({
        title: $('#u_name').val()
        , user_name: $('#u_login').val()
        , pwd: $('#u_pwd').val()
    })
};

const Listener = {
    // 修改按钮
    update: ()=> {
        $('#user_list').on('click', '.user-update', function () {
            const $u = $(this);
            Dom.setForm($u.data('title'), $u.data('un'));
            $('#u_uid').val($u.data('uid'));
            $('#user_detail').modal('show');
        });
    }

    // 删除按钮
    , remove: ()=> {
        $('#user_list').on('click', '.user-remove', function () {
            Data.remove($(this).data('uid'))
                .then(()=> tableApi.ajax.reload())
                .catch(e=>alert(e));
        });
    }

    // 关闭按钮和重置按钮 重置form
    , initForm: ()=> {
        $('#user_detail').on('hidden.bs.modal', ()=>Dom.initForm());
        $('#u_reset').on('click', ()=>Dom.initForm());
    }

    // 保存按钮
    , save: ()=> {
        $('#u_submit').one('click', function () {
            const uid = parseInt($('#u_uid').val());
            if (uid === -1) { // 新增
                Data.add(Dom.getForm())
                    .then(()=> {
                        tableApi.ajax.reload();
                        $('#user_detail').modal('hide');
                    })
                    .catch(e=>alert(e));
            } else { // 更新
                let user = Dom.getForm();
                user.uid = uid;
                Data.update(user)
                    .then(()=> {
                        tableApi.ajax.reload();
                        $('#user_detail').modal('hide');
                    })
                    .catch(e=>alert(e));
            }
            Listener.save();
        });
    }

    // 事件监听的初始化
    , init: function () {
        this.initForm();
        this.update();
        this.remove();
        this.save();
    }
};

$(function () {
    Table.init();
    Listener.init();
});
