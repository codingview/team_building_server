/**
 * Created by zhangrz on 9月17.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

'use strict';

/* 产品 */

class Production {
    constructor(pid) {
        if (pid) {
            this.id = pid;
        }
    }

    /**
     * 从表单转成表结构
     * @param {object} p
     * @returns {Production}
     */
    form2Db(p) {
        this.name = p.name;
        this.title = p.title;
        this.md5 = require('../utils/global/method').md5(p.name + '_' + p.title + '_' + new Date().getTime());// 生成md5
        this.state = 1; // 默认为1
        this.views = 0; // 浏览次数为0
        this.catalog_id = parseInt(p.catalog_id);
        this.tags = p.tags;
        this.rich_text = p.rich_text;
        this.text = p.text;
        this.sequence = parseInt(p.sequence) || 99;
        return this;
    }

    /**
     * 表结构转table
     * @param {object} p
     * @returns {Production}
     */
    db2Api(p) {
        this.name = p.name;
        this.title = p.title;
        this.md5 = p.md5;
        this.state = p.state;
        this.views = p.views;
        this.sequence = p.sequence;
        this.catalog_id = p.catalog_id;
        return this;
    }
}

module.exports = Production;