/**
 * Created by zhangrz on 2017/11/30.
 * Copyright© 2015-2020 DiandaInfo (https://github.com/diandainfo)
 * @version 0.0.1 created
 */

'use strict';

const express = require('express')
    , fs = require('fs')
    , path = require('path')
    , marked = require('marked')
    , router = new express.Router();

// 版本更新说明
router.get('/', (req, res)=> {
    const file = fs.readFileSync(path.join(__dirname, '../../doc/version.md'), 'utf-8')
        , Renderer = marked.Renderer;
    Renderer.prototype.table=function(header, body) {
        return '<table class="table table-striped table-bordered table-condensed mt-2e">\n'
            + '<thead>\n'
            + header
            + '</thead>\n'
            + '<tbody>\n'
            + body
            + '</tbody>\n'
            + '</table>\n';
    };
    let html = marked(file);
    res.render('./admin/version/view', {
        title: '更新日志'
        , marked: html
    });
});

module.exports = router;
