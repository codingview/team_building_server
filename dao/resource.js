/**
 * Created by zhangrz on 9月17.
 * Copyright© 2015-2020 occultskyrong (https://github.com/occultskyrong)
 * @version 0.0.1 created
 */

'use strict';

/**
 * 产品
 */
class Resource {
    /**
     * 构造函数
     * @param {number} eid
     */
    constructor(eid) {
        if (eid) {
            this.id = eid;
        }
    }

    /**
     * 更新:从表单转成表结构
     * @param {object} e
     * @return {Example}
     */
    update(e) {
        this.name = e.name;
        this.title = e.title;
        this.state = 1;
        this.catalog_id = parseInt(e.catalog_id);
        this.abstract = e.abstract;
        this.tags = e.tags;
        this.rich_text = e.rich_text;
        this.text = e.text;
        this.sequence = parseInt(e.sequence) || 99;
        return this;
    }

    /**
     * 新增:从表单转成表结构
     * @param {object} e
     * @return {Example}
     */
    form2Db(e) {
        this.update(e);
        this.md5 = require('../utils/global/method').filename(e.name + '_' + e.title + '_');// 生成md5
        this.views = 0; // 浏览次数为0
        this.icon = '/resource/' + this.md5 + '.jpeg';
        return this;
    }

    /**
     * 表结构转table
     * @param {object} e
     * @return {Example}
     */
    db2Api(e) {
        this.name = e.name;
        this.title = e.title;
        this.md5 = e.md5;
        this.state = e.state;
        this.views = e.views;
        this.sequence = e.sequence;
        this.catalog_id = e.catalog_id;
        this.created_at = e.created_at;
        this.updated_at = e.updated_at;
        return this;
    }

    /**
     * 表结构转缩略图数据
     * @param {object} e
     * @return {Example}
     */
    db2Icon(e) {
        this.db2Api(e);
        this.icon = e.icon ? '/uploads' + e.icon : '/images/resource.icon.jpeg';
        this.abstract = e.abstract;
        return this;
    }

    /**
     * 表结构转详情数据
     * @param {object} e
     * @return {Example}
     */
    db2Detail(e) {
        this.db2Icon(e);
        this.rich_text = e.rich_text;
        this.text = e.text;
        this.tags = e.tags;
        return this;
    }
}

module.exports = Resource;
