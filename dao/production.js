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
        this.catalog_id = parseInt(p.catalog_id);
        this.tags = p.tags;
        this.rich_text = p.rich_text;
        this.text = p.text;
        this.sequence = parseInt(p.sequence);
        return this;
    }

}

module.exports = Production;
