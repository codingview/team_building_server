/**
 * Created by zhangrz on 9月17.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

'use strict';

/**
 * 产品
 */
class Production {
    /**
     * 构造函数
     * @param {number} pid
     */
    constructor(pid) {
        if (pid) {
            this.id = pid;
        }
    }

    /**
     * 更新:从表单转成表结构
     * @param {object} p
     * @return {Production}
     */
    update(p) {
        this.name = p.name;
        this.title = p.title;
        this.state = 1;
        this.first_catalog_id = parseInt(p.fci);
        this.second_catalog_id = parseInt(p.sci);
        this.abstract = p.abstract;
        this.tags = p.tags;
        this.rich_text = p.rich_text;
        this.text = p.text;
        this.sequence = parseInt(p.sequence) || 99;
        return this;
    }

    /**
     * 新增:从表单转成表结构
     * @param {object} p
     * @return {Production}
     */
    form2Db(p) {
        this.update(p);
        this.md5 = require('../utils/global/method').filename(p.name + '_' + p.title + '_');// 生成md5
        this.views = 0; // 浏览次数为0
        this.icon = '/production/' + this.md5 + '.jpeg';
        return this;
    }

    /**
     * 表结构转table
     * @param {object} p
     * @return {Production}
     */
    db2Api(p) {
        this.name = p.name;
        this.title = p.title;
        this.md5 = p.md5;
        this.state = p.state;
        this.views = p.views;
        this.sequence = p.sequence;
        this.fci = p.first_catalog_id;
        this.sci = p.second_catalog_id;
        this.created_at = p.created_at;
        this.updated_at = p.updated_at;
        return this;
    }

    /**
     * 表结构转缩略图数据
     * @param {object} p
     * @return {Production}
     */
    db2Icon(p) {
        this.db2Api(p);
        this.icon = p.icon ? '/uploads' + p.icon : '/images/production.icon.jpg';
        this.abstract = p.abstract;
        return this;
    }

    /**
     * 表结构转详情数据
     * @param {object} p
     * @return {Production}
     */
    db2Detail(p) {
        this.db2Icon(p);
        this.rich_text = p.rich_text;
        this.text = p.text;
        this.tags = p.tags;
        return this;
    }
}

module.exports = Production;
