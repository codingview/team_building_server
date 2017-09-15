/**
 * Created by zhangrz on 2017/9/15.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

/**
 * 产品分类
 */
class ProductionCatalog {
    /**
     * 构造函数
     * @param {number} cid
     */
    constructor(cid) {
        if (cid) {
            this.id = cid;
        }
    }

    /**
     * db结构转出api
     * @param {object} pc
     * @return {ProductionCatalog}
     */
    db2Api(pc) {
        this.text = pc.name;
        this.grade = pc.grade;
        this.father_id = pc.father_id || 0;
        this.sequence = pc.sequence;
        this.icon = pc.icon;
        return this;
    }
}

module.exports = ProductionCatalog;
