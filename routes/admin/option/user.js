/**
 * Created by zrz on 2017/9/6.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router();

// 管理员 - 页面 - 列表
router.get('/', (req, res)=>
    res.render('./admin/option/user/view', {
        title: '管理员管理'
    })
);

// 管理员 - api - 列表
router.post('/list', (req, res)=> {

});

// 管理员 - api - 新增
router.put('/',(req,res)=>{

});

// 管理员 - api - 删除
router.delete('/:uid',(req,res)=>{

});

module.exports = router;