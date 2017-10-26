/**
 * Created by zhangrz on 2017/9/4.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

// 输出显示信息
const printF = msg=>alert(msg)
    , listener = {
    // 表单提交
    submit: ()=> {
        $('#login_submit').one('click', ()=> {
            const user_name = $('#user_name').val()
                , pwd = $('#pwd').val();
            if (user_name && pwd) {
                $.ajax({
                    type: 'post'
                    , url: '/admin/login'
                    , data: {user_name, pwd}
                    , dataType: 'json'
                    , success: data=> {
                        if (data && 'status' in data && data.status > 0) {
                            location.href = '/admin';
                        } else {
                            printF('message' in data ? data.message : '登录失败');
                            listener.submit(); // 重新绑定监听
                        }
                    }, error: e=> {
                        console.error(e);
                        printF('连接超时,请重试');
                        listener.submit(); // 重新绑定监听
                    }
                });
            } else {
                printF('请输入账号和密码');
                listener.submit(); // 重新绑定监听
            }
        });
    }

    // 密码输入框的回车监听
    , inputEnterListener: ()=> {
        $('#pwd').on('keyup', function (event) {
                if (event.keyCode === 13) {
                    $('#login_submit').click();
                }
            }
        );
    }

    // 初始化监听
    , init: function () {
        this.submit();
        this.inputEnterListener();
    }
};

(function () {
    listener.init();
}());
