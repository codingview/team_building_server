/**
 * Created by zhangrz on 2017/9/19.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

/**
 * 反馈
 */
class Feedback {
    /**
     * 构造函数
     * @param {number} fid
     */
    constructor(fid) {
        if (fid) {
            this.id = fid;
        }
    }

    /**
     * 表结构转api
     * @param {object} f
     * @return {Production}
     */
    db2Api(f) {
        this.fid = f.id;
        this.title = f.name;
        this.phone = parseInt(f.phone);
        this.state = parseInt(f.state);
        this.content = f.content;
        this.ip = f.ip;
        this.created_at = f.created_at;
        this.updated_at = f.updated_at;
        return this;
    }
}

module.exports = Feedback;
