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

                    }
                });
            } else {
                printF('请输入账号和密码');
                listener.submit(); // 重新绑定监听
            }
        });
    }

    // 初始化监听
    , init: function () {
        this.submit();
    }
};

(function () {
    listener.init();
}());
