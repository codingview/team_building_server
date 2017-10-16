/**
 * Created by zrz on 2017/9/6.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , router = new express.Router()
    , adminService = require('../../../service/admin');

// 管理员 - 新增 - api
router.post('/', (req, res)=> {
    const body = req.body;
    let _ = {};
    if ('user_name' in body && body.user_name) {
        _.login_name = body.user_name;
    } else {
        return res.json(GLO.error('未获取到登录账号:user_name', -11));
    }
    if ('title' in body && body.title) {
        _.name = body.title;
    } else {
        return res.json(GLO.error('未获取到名称:name', -15));
    }
    if ('pwd' in body && body.pwd) {
        if (body.pwd.toString().length > 6) {
            _.password = body.pwd;
        } else {
            return res.json(GLO.error('密码长度不小于6位', -19));
        }
    } else {
        return res.json(GLO.error('未获取到密码:pwd', -18));
    }
    adminService.add(_)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '新增管理员失败')));
});

// 管理员 - api - 删除
router.delete('/:uid', (req, res)=>
    adminService.del(req.params.uid)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '删除管理员失败')))
);


// 管理员 - 页面 - 列表
router.get('/', (req, res)=>
    res.render('./admin/option/user/view', {
        title: '管理员管理'
    })
);

// 管理员 - api - 列表
router.post('/list', (req, res)=> {
    const body = req.body;
    let _ = {
        offset: 'start' in body ? parseInt(body.start) : 0
        , limit: 'length' in body ? parseInt(body.length) : 10
    };
    adminService.query.list(_)
        .then(r=>res.json({
            draw: 'draw' in body ? parseInt(body.draw) : 1
            , data: r.results
            , recordsTotal: r.count
            , recordsFiltered: r.count
        }))
        .catch(e=> res.json({
                draw: 'draw' in body ? parseInt(body.draw) : -1
                , data: []
                , recordsTotal: 0
                , recordsFiltered: 0
                , message: GLO.eLog(e, '读取管理员列表出错', -99)
            })
        );
});

// 管理员 - api - 更新
router.put('/:uid', (req, res)=> {
    const body = req.body;
    let _ = {id: parseInt(req.params.uid)};
    if ('user_name' in body && body.user_name) {
        _.login_name = body.user_name;
    } else {
        return res.json(GLO.error('未获取到登录账号:user_name', -11));
    }
    if ('title' in body && body.title) {
        _.name = body.title;
    } else {
        return res.json(GLO.error('未获取到名称:name', -15));
    }
    if ('pwd' in body && body.pwd) {
        if (body.pwd.toString().length > 6) {
            _.password = body.pwd;
        } else {
            return res.json(GLO.error('密码长度不小于6位', -19));
        }
    }
    adminService.update(_)
        .then(r=>res.json(GLO.success(r)))
        .catch(e=>res.json(GLO.error(e, -99, '更新管理员失败')));
});

module.exports = router;
