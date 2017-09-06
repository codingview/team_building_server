/**
 * Created by zrz on 2017/9/6.
 * Copyright© 2015-2020 codingview (https://github.com/codingview)
 * @version 0.0.1 created
 */

'use strict';

/**
 * 管理员
 */
class Admin {
    /**
     * 构造函数
     * @param {number} uid 用户编号
     */
    constructor(uid) {
        if (uid) {
            this.id = uid;
        }
    }

    //

    /**
     * 抛出api应用
     * @param {object} admin
     * @return {Admin}
     */
    db2Api(admin) {
        this.uid = admin.id;
        this.user_name = admin.login_name;
        this.title = admin.name;
        this.created_at = admin.created_at;
        this.updated_at = admin.updated_at;
        delete this.id;
        return this;
    }
}

module.exports = Admin;
