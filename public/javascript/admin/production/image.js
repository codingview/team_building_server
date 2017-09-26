/**
 * Created by zhangrz on 2017/9/26.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created 图片处理相关
 */

'use strict';

const _ = {
    // 上传图片
    ajax: ()=>new Promise((resolve, reject)=>
        $.ajax({
            url: '/admin/production/image'
            , type: 'put'
            , data: _.getForm()
            , dataType: 'json'
            , processData: false // 告诉JSLite不要去处理发送的数据
            , contentType: false // 告诉JSLite不要去设置Content-Type请求头
            , success: json=> {
                if (json && 'status' in json && json.status > 0) {
                    resolve(json.data);
                } else {
                    reject('message' in json ? json.message : '上传图片出错');
                }
            }, error: e=> {
                console.error(e);
                reject('上传图片超时');
            }
        })
    )
    // 获取图片
    , getForm: ()=> {
        let formData = new FormData();
        formData.append('img', $('#p_icon').get(0).files[0]);
        return formData;
    }

    // 监听
    , init: ()=> {
        $('#p_icon').on('change', function () {
            _
                .ajax()
                .then(r=> {
                    console.info(r)
                    $('#p_icon_val').val(1); // 设置临时图片有值
                })
                .catch(e=>alert(e))
        });
    }
};

module.exports = _.init;
