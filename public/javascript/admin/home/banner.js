/**
 * Created by zhangrz on 2017/9/21.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created 首页banner管理
 */

'use strict';

const $ajax = require('../../general/Ajax.general');

const Data = {
    // 获取 - 广告位 - 列表
    list: ()=>$ajax({
        url: '/admin/home/banner/list'
        , type: 'get'
        , text: '读取广告位'
    })

    // 删除广告位
    , remove: bid=>$ajax({
        url: '/admin/home/banner/' + bid
        , type: 'delete'
        , text: '删除广告位'
    })
};

const Dom = {
    // 拼装banner
    setBanner: banner=> `
            <div class="row banner-content" data-bid="${banner.bid}">
                <div class="col-lg-8"><img src="/uploads${banner.img}" width="100%"></div>
                <div class="col-lg-4">
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon">链接</div>
                            <input type="text" class="form-control banner-link" value="${banner.href}"
                             placeholder="广告位链接">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <div class="input-group-addon">描述</div>
                            <textarea rows="3" class="form-control banner-description"
                             placeholder="广告位描述">${banner.dcp}</textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <button type="button" class="btn btn-danger wi-6e banner-remove"
                         data-bid="${banner.bid}">删除</button>
                    </div>
                </div>
            </div>`

    // 填充banner
    , banner: list=> {
        let str = '';
        list.forEach(b=> {
            str += Dom.setBanner(b);
        });
        $('#banner_list').html(str);
    }

    // 初始化
    , init: function () {
        Data.list()
            .then(list=>Dom.banner(list))
            .catch(e=>alert(e));
    }
};

const Listener = {
    // 删除按钮的监听
    remove: ()=> {
        $('#banner_list').on('click', '.banner-remove', function () {
            const bid = $(this).data('bid');
            Data.remove(bid)
                .then(()=> {
                    $('.banner-content[data-bid="' + bid + '"]').remove();
                })
                .catch(e=>alert(e));
        });
    }

    // 初始化
    , init: function () {
        this.remove();
    }

};

$(function () {
    Dom.init();
    Listener.init();
});
