/**
 * Created by zhangrz on 2017/9/15.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

/* 产品分类 */

let zTreeObj; // ztree的实例

const Data = {
    // 获取分类列表
    catalogs: ()=>new Promise((resolve, reject)=>
        $.ajax({
            url: '/admin/production/catalog'
            , method: 'post'
            , dataType: 'json'
            , success: json=> {
                if (json && 'status' in json && json.status > 0) {
                    resolve(json.data);
                } else {
                    reject('message' in json ? json.message : '获取数据出错');
                }
            }, error: e=> {
                console.error(e);
                reject('请求超时');
            }
        })
    )
};

const Dom = {
    // 生成分类树
    catalogs: ()=> {
        Data.catalogs()
            .then(catalogs=>
                zTreeObj = $.fn.zTree.init($('#production_catalog'), [], catalogs)
            )
            .catch(e=>alert(e));
    }

    // 初始化
    , init: function () {
        this.catalogs();
    }
};

const Listener = {};

$(function () {
    Dom.init();
});
