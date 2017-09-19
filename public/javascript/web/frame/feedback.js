/**
 * Created by zhangrz on 2017/9/19.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const _ = {
    // 弹出提示框
    printF: ($t, title)=>
        $t.tooltip({
            placement: 'left'
            , title: title
        }).tooltip('show')

    // 获取数据
    , getParams: ()=> {
        const $name = $('#f_name')
            , name = $name.val()
            , $phone = $('#f_phone')
            , phone = $phone.val()
            , $content = $('#f_content')
            , content = $content.val();
        let __ = {};
        if (name) {
            __.name = name;
        } else {
            _.printF($name, '请输入姓名');
            return false;
        }
        if (phone) {
            __.phone = parseInt(phone);
        } else {
            _.printF($phone, '请输入手机号码');
            return false;
        }
        if (content) {
            __.content = content;
        } else {
            _.printF($content, '请输入留言内容');
            return false;
        }
        return __;
    }

    // 提交form
    , sendForm: form=>new Promise((resolve, reject)=>
        $.ajax({
            url: '/api/feedback'
            , type: 'post'
            , data: form
            , dataType: 'json'
            , success: json=> {
                if (json && 'status' in json && json.status > 0) {
                    resolve();
                } else {
                    reject('message' in json ? json.message : '提交反馈出错');
                }
            }, error: e=> {
                console.error(e);
                reject('提交反馈超时');
            }
        })
    )

    // 监听提交
    , setOneSubmit: ()=>
        $('#f_submit').one('click', function () {
            const params = _.getParams();
            if (params) {
                _.sendForm(params)
                    .then(()=>_.setOneSubmit())
                    .catch(e=> {
                        _.setOneSubmit();
                        alert(e);
                    });
            } else {
                _.setOneSubmit();
            }
        })

    // 输入框检查
    , setInputListener: ()=> {
        // 手机号输入框只能输入数字
        $('#f_phone').on('afterpaste keyup', function () {
            const $i = $(this);
            $i.val($i.val().replace(/[^0-9]/g, ''));
        });

        // 输入框去掉tooltip
        $('#f_name,#f_phone,#f_content').on('keyup', function () {
            $(this).tooltip('destroy');
        });
    }

    // 初始化
    , init: ()=> {
        _.setOneSubmit();
        _.setInputListener();
    }
};

module.exports = _.init;
