/**
 * Created by zhangrz on 2017/8/25.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created 关于我们
 */

'use strict';

const express = require('express')
    , router = new express.Router()
    , menuConfig = require('../../../config/about_menu')
    , aboutService = require('../../../service/about');

// 关于我们 - home页
router.get('/', (req, res)=>res.redirect('/about/home'));

// 关于我们 - 其他页面
router.get('/:title', (req, res)=> {
    const title = req.params.title;
    aboutService.read(title)
        .then(rich_text=>res.render('./web/about/view', {
            active: 'about'
            , title: '关于我们'
            , menu: menuConfig
            , active_menu: req.params.title
            , rich_text: rich_text
        }))
        // todo 读取错误页面
        .catch(e=> {
            GLO.error(e, -99, '读取关于我们发生错误');
            res.redirect('/error?');
        });
});

module.exports = router;
